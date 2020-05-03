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
 * @fileoverview Tests for fonts.
 *
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.MathspeakFrenchFontTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathspeakFrenchFontTest = function() {
  sre.MathspeakFrenchFontTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Mathspeak French Font tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.locale = 'fr';

  this.setActive('MathspeakFrenchFont');
};
goog.inherits(sre.MathspeakFrenchFontTest, sre.AbstractRuleTest);


/**
 *
 * Font tests serve primarily to check for correct replacement of font names.
 *
 * We check:
 * 1. Fonts for unicode characters (with mathfonts on plane 1).
 * 2. Fonts for mathvariant inclusion (including TeX specific fonts).
 * 3. Correct replacements in case both unicode and mathvariants are given.
 *
 */


/**
 *  Part 1: Unicode Characters
 */


/**
 * Test for Unicode Latin mathfonts upper letters.
 */
sre.MathspeakFrenchFontTest.prototype.testLatinMathfontsUpper = function() {
  this.executeRuleTest('<mi>&#x0041;</mi>', 'A majuscule', 'default');
  this.executeRuleTest('<mi>&#xFF21;</mi>', 'A majuscule', 'default');
  this.executeRuleTest('<mi>&#x1D400;</mi>', 'A majuscule en gras', 'default');
  this.executeRuleTest('<mi>&#x1D434;</mi>', 'A majuscule en italique', 'default');
  this.executeRuleTest('<mi>&#x1D468;</mi>', 'A majuscule en italique gras', 'default');
  this.executeRuleTest('<mi>&#x1D49C;</mi>', 'A majuscule de ronde', 'default');
  this.executeRuleTest('<mi>&#x1D4D0;</mi>', 'A majuscule de ronde en gras', 'default');
  this.executeRuleTest('<mi>&#x1D504;</mi>', 'A majuscule en gothique', 'default');
  this.executeRuleTest('<mi>&#x1D538;</mi>', 'A majuscule ajouré', 'default');
  this.executeRuleTest('<mi>&#x1D56C;</mi>', 'A majuscule en gothique gras', 'default');
  this.executeRuleTest('<mi>&#x1D5A0;</mi>', 'A majuscule sans empattement', 'default');
  this.executeRuleTest('<mi>&#x1D5D4;</mi>', 'A majuscule en gras sans empattement', 'default');
  this.executeRuleTest('<mi>&#x1D608;</mi>', 'A majuscule en italique sans empattement', 'default');
  this.executeRuleTest('<mi>&#x1D63C;</mi>', 'A majuscule en italique gras sans empattement', 'default');
  this.executeRuleTest('<mi>&#x1D670;</mi>', 'A majuscule en chasse fixe', 'default');
};


/**
 * Test for Unicode Greek mathfonts upper letters.
 */
sre.MathspeakFrenchFontTest.prototype.testGreekMathfontsUpper = function() {
  this.executeRuleTest('<mi>&#x0391;</mi>', 'Alpha majuscule', 'default');
  this.executeRuleTest('<mi>&#x1D6A8;</mi>', 'Alpha majuscule en gras', 'default');
  this.executeRuleTest('<mi>&#x1D6E2;</mi>', 'Alpha majuscule en italique', 'default');
  this.executeRuleTest('<mi>&#x1D71C;</mi>', 'Alpha majuscule en italique gras', 'default');
  this.executeRuleTest('<mi>&#x1D756;</mi>', 'Alpha majuscule en gras sans empattement', 'default');
  this.executeRuleTest('<mi>&#x1D790;</mi>', 'Alpha majuscule en italique gras sans empattement', 'default');
};


/**
 * Test for Unicode Latin mathfonts small letters.
 */
sre.MathspeakFrenchFontTest.prototype.testLatinMathfontsSmall = function() {
  this.executeRuleTest('<mi>&#x0061;</mi>', 'a', 'default');
  this.executeRuleTest('<mi>&#xFF41;</mi>', 'a', 'default');
  this.executeRuleTest('<mi>&#x1D41A;</mi>', 'a en gras', 'default');
  this.executeRuleTest('<mi>&#x1D44E;</mi>', 'a en italique', 'default');
  this.executeRuleTest('<mi>&#x1D482;</mi>', 'a en italique gras', 'default');
  this.executeRuleTest('<mi>&#x1D4B6;</mi>', 'a de ronde', 'default');
  this.executeRuleTest('<mi>&#x1D4EA;</mi>', 'a de ronde en gras', 'default');
  this.executeRuleTest('<mi>&#x1D51E;</mi>', 'a en gothique', 'default');
  this.executeRuleTest('<mi>&#x1D552;</mi>', 'a ajouré', 'default');
  this.executeRuleTest('<mi>&#x1D586;</mi>', 'a en gothique gras', 'default');
  this.executeRuleTest('<mi>&#x1D5BA;</mi>', 'a sans empattement', 'default');
  this.executeRuleTest('<mi>&#x1D5EE;</mi>', 'a en gras sans empattement', 'default');
  this.executeRuleTest('<mi>&#x1D622;</mi>', 'a en italique sans empattement', 'default');
  this.executeRuleTest('<mi>&#x1D656;</mi>', 'a en italique gras sans empattement', 'default');
  this.executeRuleTest('<mi>&#x1D68A;</mi>', 'a en chasse fixe', 'default');
};


/**
 * Test for Unicode Greek mathfonts small letters.
 */
sre.MathspeakFrenchFontTest.prototype.testGreekMathfontsSmall = function() {
  this.executeRuleTest('<mi>&#x03B1;</mi>', 'alpha', 'default');
  this.executeRuleTest('<mi>&#x1D6C2;</mi>', 'alpha en gras', 'default');
  this.executeRuleTest('<mi>&#x1D6FC;</mi>', 'alpha en italique', 'default');
  this.executeRuleTest('<mi>&#x1D736;</mi>', 'alpha en italique gras', 'default');
  this.executeRuleTest('<mi>&#x1D770;</mi>', 'alpha en gras sans empattement', 'default');
  this.executeRuleTest('<mi>&#x1D7AA;</mi>', 'alpha en italique gras sans empattement', 'default');
};


/**
 *  Part 2: Mathvariants
 */


/**
 * Test for Latin with mathvariant upper letters.
 */
sre.MathspeakFrenchFontTest.prototype.testLatinMathvariantUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">A</mi>', 'A majuscule en normal', 'default');
  this.executeRuleTest('<mi mathvariant="bold">A</mi>', 'A majuscule en gras', 'default');
  this.executeRuleTest('<mi mathvariant="italic">A</mi>', 'A majuscule', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">A</mi>', 'A majuscule en italique gras', 'default');
  this.executeRuleTest('<mi mathvariant="script">A</mi>', 'A majuscule de ronde', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">A</mi>', 'A majuscule de ronde en gras', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">A</mi>', 'A majuscule en gothique', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">A</mi>', 'A majuscule ajouré', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">A</mi>', 'A majuscule en gothique gras', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">A</mi>', 'A majuscule sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">A</mi>', 'A majuscule en gras sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">A</mi>', 'A majuscule en italique sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">A</mi>', 'A majuscule en italique gras sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">A</mi>', 'A majuscule en chasse fixe', 'default');
};


/**
 * Test for Latin with special MathJax mathvariants.
 */
sre.MathspeakFrenchFontTest.prototype.testLatinMathvariantMathJax = function() {
  this.executeRuleTest('<mi mathvariant="-tex-caligraphic">A</mi>', 'A majuscule en calligraphique', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-caligraphic-bold">A</mi>', 'A majuscule en calligraphique gras', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-calligraphic">A</mi>', 'A majuscule en calligraphique', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-calligraphic-bold">A</mi>', 'A majuscule en calligraphique gras', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-mathit">A</mi>', 'A majuscule', 'default');
};


/**
 * Test for Greek with mathvariant upper letters.
 */
sre.MathspeakFrenchFontTest.prototype.testGreekMathvariantUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0391;</mi>', 'Alpha majuscule en normal', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x0391;</mi>', 'Alpha majuscule en gras', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x0391;</mi>', 'Alpha majuscule', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x0391;</mi>', 'Alpha majuscule en italique gras', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x0391;</mi>', 'Alpha majuscule en gras sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x0391;</mi>', 'Alpha majuscule en italique gras sans empattement', 'default');
};


/**
 * Test for Latin with mathvariant small letters.
 */
sre.MathspeakFrenchFontTest.prototype.testLatinMathvariantSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">a</mi>', 'a en normal', 'default');
  this.executeRuleTest('<mi mathvariant="bold">a</mi>', 'a en gras', 'default');
  this.executeRuleTest('<mi mathvariant="italic">a</mi>', 'a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">a</mi>', 'a en italique gras', 'default');
  this.executeRuleTest('<mi mathvariant="script">a</mi>', 'a de ronde', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">a</mi>', 'a de ronde en gras', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">a</mi>', 'a en gothique', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">a</mi>', 'a ajouré', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">a</mi>', 'a en gothique gras', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">a</mi>', 'a sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">a</mi>', 'a en gras sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">a</mi>', 'a en italique sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">a</mi>', 'a en italique gras sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">a</mi>', 'a en chasse fixe', 'default');
};


/**
 * Test for Greek with mathvariant small letters.
 */
sre.MathspeakFrenchFontTest.prototype.testGreekMathvariantSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x03B1;</mi>', 'alpha en normal', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x03B1;</mi>', 'alpha en gras', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x03B1;</mi>', 'alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x03B1;</mi>', 'alpha en italique gras', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x03B1;</mi>', 'alpha en gras sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x03B1;</mi>', 'alpha en italique gras sans empattement', 'default');
};


/**
 *  Part 3: Mathvariants and Unicode Characters
 */


/**
 * Test for Unicode Latin mathfonts with mathvariant upper letters.
 */
sre.MathspeakFrenchFontTest.prototype.testLatinFontVariantsUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0041;</mi>', 'A majuscule en normal', 'default');
  this.executeRuleTest('<mi mathvariant="normal">&#xFF21;</mi>', 'A majuscule en normal', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D400;</mi>', 'A majuscule en gras', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D434;</mi>', 'A majuscule en italique', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D468;</mi>', 'A majuscule en italique gras', 'default');
  this.executeRuleTest('<mi mathvariant="script">&#x1D49C;</mi>', 'A majuscule de ronde', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">&#x1D4D0;</mi>', 'A majuscule de ronde en gras', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">&#x1D504;</mi>', 'A majuscule en gothique', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">&#x1D538;</mi>', 'A majuscule ajouré', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">&#x1D56C;</mi>', 'A majuscule en gothique gras', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">&#x1D5A0;</mi>', 'A majuscule sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D5D4;</mi>', 'A majuscule en gras sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">&#x1D608;</mi>', 'A majuscule en italique sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D63C;</mi>', 'A majuscule en italique gras sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">&#x1D670;</mi>', 'A majuscule en chasse fixe', 'default');
};


/**
 * Test for Unicode Greek mathfonts with mathvariant upper letters.
 */
sre.MathspeakFrenchFontTest.prototype.testGreekFontVariantsUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0391;</mi>', 'Alpha majuscule en normal', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D6A8;</mi>', 'Alpha majuscule en gras', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D6E2;</mi>', 'Alpha majuscule en italique', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D71C;</mi>', 'Alpha majuscule en italique gras', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D756;</mi>', 'Alpha majuscule en gras sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D790;</mi>', 'Alpha majuscule en italique gras sans empattement', 'default');
};


/**
 * Test for Unicode Latin mathfonts with mathvariant small letters.
 */
sre.MathspeakFrenchFontTest.prototype.testLatinFontVariantsSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0061;</mi>', 'a en normal', 'default');
  this.executeRuleTest('<mi mathvariant="normal">&#xFF41;</mi>', 'a en normal', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D41A;</mi>', 'a en gras', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D44E;</mi>', 'a en italique', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D482;</mi>', 'a en italique gras', 'default');
  this.executeRuleTest('<mi mathvariant="script">&#x1D4B6;</mi>', 'a de ronde', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">&#x1D4EA;</mi>', 'a de ronde en gras', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">&#x1D51E;</mi>', 'a en gothique', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">&#x1D552;</mi>', 'a ajouré', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">&#x1D586;</mi>', 'a en gothique gras', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">&#x1D5BA;</mi>', 'a sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D5EE;</mi>', 'a en gras sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">&#x1D622;</mi>', 'a en italique sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D656;</mi>', 'a en italique gras sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">&#x1D68A;</mi>', 'a en chasse fixe', 'default');
};


/**
 * Test for Unicode Greek mathfonts with mathvariant small letters.
 */
sre.MathspeakFrenchFontTest.prototype.testGreekFontVariantsSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x03B1;</mi>', 'alpha en normal', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D6C2;</mi>', 'alpha en gras', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D6FC;</mi>', 'alpha en italique', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D736;</mi>', 'alpha en italique gras', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D770;</mi>', 'alpha en gras sans empattement', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D7AA;</mi>', 'alpha en italique gras sans empattement', 'default');
};

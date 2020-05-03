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

goog.provide('sre.MathspeakEnglishFontTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathspeakEnglishFontTest = function() {
  sre.MathspeakEnglishFontTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Mathspeak English Font tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  this.setActive('MathspeakEnglishFont');
};
goog.inherits(sre.MathspeakEnglishFontTest, sre.AbstractRuleTest);


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
sre.MathspeakEnglishFontTest.prototype.testLatinMathfontsUpper = function() {
  this.executeRuleTest('<mi>&#x0041;</mi>', 'upper A', 'default');
  this.executeRuleTest('<mi>&#xFF21;</mi>', 'upper A', 'default');
  this.executeRuleTest('<mi>&#x1D400;</mi>', 'bold upper A', 'default');
  this.executeRuleTest('<mi>&#x1D434;</mi>', 'italic upper A', 'default');
  this.executeRuleTest('<mi>&#x1D468;</mi>', 'bold italic upper A', 'default');
  this.executeRuleTest('<mi>&#x1D49C;</mi>', 'script upper A', 'default');
  this.executeRuleTest('<mi>&#x1D4D0;</mi>', 'bold script upper A', 'default');
  this.executeRuleTest('<mi>&#x1D504;</mi>', 'German upper A', 'default');
  this.executeRuleTest('<mi>&#x1D538;</mi>', 'double struck upper A', 'default');
  this.executeRuleTest('<mi>&#x1D56C;</mi>', 'bold German upper A', 'default');
  this.executeRuleTest('<mi>&#x1D5A0;</mi>', 'sans serif upper A', 'default');
  this.executeRuleTest('<mi>&#x1D5D4;</mi>', 'sans serif bold upper A', 'default');
  this.executeRuleTest('<mi>&#x1D608;</mi>', 'sans serif italic upper A', 'default');
  this.executeRuleTest('<mi>&#x1D63C;</mi>', 'sans serif bold italic upper A', 'default');
  this.executeRuleTest('<mi>&#x1D670;</mi>', 'monospace upper A', 'default');
};


/**
 * Test for Unicode Greek mathfonts upper letters.
 */
sre.MathspeakEnglishFontTest.prototype.testGreekMathfontsUpper = function() {
  this.executeRuleTest('<mi>&#x0391;</mi>', 'upper Alpha', 'default');
  this.executeRuleTest('<mi>&#x1D6A8;</mi>', 'bold upper Alpha', 'default');
  this.executeRuleTest('<mi>&#x1D6E2;</mi>', 'italic upper Alpha', 'default');
  this.executeRuleTest('<mi>&#x1D71C;</mi>', 'bold italic upper Alpha', 'default');
  this.executeRuleTest('<mi>&#x1D756;</mi>', 'sans serif bold upper Alpha', 'default');
  this.executeRuleTest('<mi>&#x1D790;</mi>', 'sans serif bold italic upper Alpha', 'default');
};


/**
 * Test for Unicode Latin mathfonts small letters.
 */
sre.MathspeakEnglishFontTest.prototype.testLatinMathfontsSmall = function() {
  this.executeRuleTest('<mi>&#x0061;</mi>', 'a', 'default');
  this.executeRuleTest('<mi>&#xFF41;</mi>', 'a', 'default');
  this.executeRuleTest('<mi>&#x1D41A;</mi>', 'bold a', 'default');
  this.executeRuleTest('<mi>&#x1D44E;</mi>', 'italic a', 'default');
  this.executeRuleTest('<mi>&#x1D482;</mi>', 'bold italic a', 'default');
  this.executeRuleTest('<mi>&#x1D4B6;</mi>', 'script a', 'default');
  this.executeRuleTest('<mi>&#x1D4EA;</mi>', 'bold script a', 'default');
  this.executeRuleTest('<mi>&#x1D51E;</mi>', 'German a', 'default');
  this.executeRuleTest('<mi>&#x1D552;</mi>', 'double struck a', 'default');
  this.executeRuleTest('<mi>&#x1D586;</mi>', 'bold German a', 'default');
  this.executeRuleTest('<mi>&#x1D5BA;</mi>', 'sans serif a', 'default');
  this.executeRuleTest('<mi>&#x1D5EE;</mi>', 'sans serif bold a', 'default');
  this.executeRuleTest('<mi>&#x1D622;</mi>', 'sans serif italic a', 'default');
  this.executeRuleTest('<mi>&#x1D656;</mi>', 'sans serif bold italic a', 'default');
  this.executeRuleTest('<mi>&#x1D68A;</mi>', 'monospace a', 'default');
};


/**
 * Test for Unicode Greek mathfonts small letters.
 */
sre.MathspeakEnglishFontTest.prototype.testGreekMathfontsSmall = function() {
  this.executeRuleTest('<mi>&#x03B1;</mi>', 'alpha', 'default');
  this.executeRuleTest('<mi>&#x1D6C2;</mi>', 'bold alpha', 'default');
  this.executeRuleTest('<mi>&#x1D6FC;</mi>', 'italic alpha', 'default');
  this.executeRuleTest('<mi>&#x1D736;</mi>', 'bold italic alpha', 'default');
  this.executeRuleTest('<mi>&#x1D770;</mi>', 'sans serif bold alpha', 'default');
  this.executeRuleTest('<mi>&#x1D7AA;</mi>', 'sans serif bold italic alpha', 'default');
};


/**
 *  Part 2: Mathvariants
 */


/**
 * Test for Latin with mathvariant upper letters.
 */
sre.MathspeakEnglishFontTest.prototype.testLatinMathvariantUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">A</mi>', 'normal upper A', 'default');
  this.executeRuleTest('<mi mathvariant="bold">A</mi>', 'bold upper A', 'default');
  this.executeRuleTest('<mi mathvariant="italic">A</mi>', 'upper A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">A</mi>', 'bold italic upper A', 'default');
  this.executeRuleTest('<mi mathvariant="script">A</mi>', 'script upper A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">A</mi>', 'bold script upper A', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">A</mi>', 'German upper A', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">A</mi>', 'double struck upper A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">A</mi>', 'bold German upper A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">A</mi>', 'sans serif upper A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">A</mi>', 'sans serif bold upper A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">A</mi>', 'sans serif italic upper A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">A</mi>', 'sans serif bold italic upper A', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">A</mi>', 'monospace upper A', 'default');
};


/**
 * Test for Latin with special MathJax mathvariants.
 */
sre.MathspeakEnglishFontTest.prototype.testLatinMathvariantMathJax = function() {
  this.executeRuleTest('<mi mathvariant="-tex-caligraphic">A</mi>', 'calligraphic upper A', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-caligraphic-bold">A</mi>', 'calligraphic bold upper A', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-calligraphic">A</mi>', 'calligraphic upper A', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-calligraphic-bold">A</mi>', 'calligraphic bold upper A', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-mathit">A</mi>', 'upper A', 'default');
};


/**
 * Test for Greek with mathvariant upper letters.
 */
sre.MathspeakEnglishFontTest.prototype.testGreekMathvariantUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0391;</mi>', 'normal upper Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x0391;</mi>', 'bold upper Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x0391;</mi>', 'upper Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x0391;</mi>', 'bold italic upper Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x0391;</mi>', 'sans serif bold upper Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x0391;</mi>', 'sans serif bold italic upper Alpha', 'default');
};


/**
 * Test for Latin with mathvariant small letters.
 */
sre.MathspeakEnglishFontTest.prototype.testLatinMathvariantSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">a</mi>', 'normal a', 'default');
  this.executeRuleTest('<mi mathvariant="bold">a</mi>', 'bold a', 'default');
  this.executeRuleTest('<mi mathvariant="italic">a</mi>', 'a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">a</mi>', 'bold italic a', 'default');
  this.executeRuleTest('<mi mathvariant="script">a</mi>', 'script a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">a</mi>', 'bold script a', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">a</mi>', 'German a', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">a</mi>', 'double struck a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">a</mi>', 'bold German a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">a</mi>', 'sans serif a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">a</mi>', 'sans serif bold a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">a</mi>', 'sans serif italic a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">a</mi>', 'sans serif bold italic a', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">a</mi>', 'monospace a', 'default');
};


/**
 * Test for Greek with mathvariant small letters.
 */
sre.MathspeakEnglishFontTest.prototype.testGreekMathvariantSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x03B1;</mi>', 'normal alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x03B1;</mi>', 'bold alpha', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x03B1;</mi>', 'alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x03B1;</mi>', 'bold italic alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x03B1;</mi>', 'sans serif bold alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x03B1;</mi>', 'sans serif bold italic alpha', 'default');
};


/**
 *  Part 3: Mathvariants and Unicode Characters
 */


/**
 * Test for Unicode Latin mathfonts with mathvariant upper letters.
 */
sre.MathspeakEnglishFontTest.prototype.testLatinFontVariantsUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0041;</mi>', 'normal upper A', 'default');
  this.executeRuleTest('<mi mathvariant="normal">&#xFF21;</mi>', 'normal upper A', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D400;</mi>', 'bold upper A', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D434;</mi>', 'italic upper A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D468;</mi>', 'bold italic upper A', 'default');
  this.executeRuleTest('<mi mathvariant="script">&#x1D49C;</mi>', 'script upper A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">&#x1D4D0;</mi>', 'bold script upper A', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">&#x1D504;</mi>', 'German upper A', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">&#x1D538;</mi>', 'double struck upper A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">&#x1D56C;</mi>', 'bold German upper A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">&#x1D5A0;</mi>', 'sans serif upper A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D5D4;</mi>', 'sans serif bold upper A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">&#x1D608;</mi>', 'sans serif italic upper A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D63C;</mi>', 'sans serif bold italic upper A', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">&#x1D670;</mi>', 'monospace upper A', 'default');
};


/**
 * Test for Unicode Greek mathfonts with mathvariant upper letters.
 */
sre.MathspeakEnglishFontTest.prototype.testGreekFontVariantsUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0391;</mi>', 'normal upper Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D6A8;</mi>', 'bold upper Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D6E2;</mi>', 'italic upper Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D71C;</mi>', 'bold italic upper Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D756;</mi>', 'sans serif bold upper Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D790;</mi>', 'sans serif bold italic upper Alpha', 'default');
};


/**
 * Test for Unicode Latin mathfonts with mathvariant small letters.
 */
sre.MathspeakEnglishFontTest.prototype.testLatinFontVariantsSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0061;</mi>', 'normal a', 'default');
  this.executeRuleTest('<mi mathvariant="normal">&#xFF41;</mi>', 'normal a', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D41A;</mi>', 'bold a', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D44E;</mi>', 'italic a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D482;</mi>', 'bold italic a', 'default');
  this.executeRuleTest('<mi mathvariant="script">&#x1D4B6;</mi>', 'script a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">&#x1D4EA;</mi>', 'bold script a', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">&#x1D51E;</mi>', 'German a', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">&#x1D552;</mi>', 'double struck a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">&#x1D586;</mi>', 'bold German a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">&#x1D5BA;</mi>', 'sans serif a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D5EE;</mi>', 'sans serif bold a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">&#x1D622;</mi>', 'sans serif italic a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D656;</mi>', 'sans serif bold italic a', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">&#x1D68A;</mi>', 'monospace a', 'default');
};


/**
 * Test for Unicode Greek mathfonts with mathvariant small letters.
 */
sre.MathspeakEnglishFontTest.prototype.testGreekFontVariantsSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x03B1;</mi>', 'normal alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D6C2;</mi>', 'bold alpha', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D6FC;</mi>', 'italic alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D736;</mi>', 'bold italic alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D770;</mi>', 'sans serif bold alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D7AA;</mi>', 'sans serif bold italic alpha', 'default');
};

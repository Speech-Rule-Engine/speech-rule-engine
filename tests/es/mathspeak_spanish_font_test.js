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

goog.provide('sre.MathspeakSpanishFontTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.MathspeakSpanishFontTest = function() {
  sre.MathspeakSpanishFontTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Mathspeak Spanish Font tests.';

  /**
   * @override
   */
  this.domain = 'mathspeak';

  /**
   * @override
   */
  this.locale = 'es';

  /**
   * @override
   */
  this.semantics = true;

  this.setActive('MathspeakSpanishFont');
};
goog.inherits(sre.MathspeakSpanishFontTest, sre.AbstractRuleTest);


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
sre.MathspeakSpanishFontTest.prototype.testLatinMathfontsUpper = function() {
  this.executeRuleTest('<mi>&#x0041;</mi>', 'mayúscula A', 'default');
  this.executeRuleTest('<mi>&#xFF21;</mi>', 'mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D400;</mi>', 'negrita mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D434;</mi>', 'cursiva mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D468;</mi>', 'negrita cursiva mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D49C;</mi>', 'script mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D4D0;</mi>', 'negrita script mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D504;</mi>', 'Fraktur mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D538;</mi>', 'negrita de pizarra mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D56C;</mi>', 'negrita Fraktur mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D5A0;</mi>', 'sans serif mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D5D4;</mi>', 'sans serif negrita mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D608;</mi>', 'sans serif cursiva mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D63C;</mi>', 'sans serif negrita cursiva mayúscula A', 'default');
  this.executeRuleTest('<mi>&#x1D670;</mi>', 'monoespacio mayúscula A', 'default');
};


/**
 * Test for Unicode Greek mathfonts upper letters.
 */
sre.MathspeakSpanishFontTest.prototype.testGreekMathfontsUpper = function() {
  this.executeRuleTest('<mi>&#x0391;</mi>', 'mayúscula Alfa', 'default');
  this.executeRuleTest('<mi>&#x1D6A8;</mi>', 'negrita mayúscula Alfa', 'default');
  this.executeRuleTest('<mi>&#x1D6E2;</mi>', 'cursiva mayúscula Alfa', 'default');
  this.executeRuleTest('<mi>&#x1D71C;</mi>', 'negrita cursiva mayúscula Alfa', 'default');
  this.executeRuleTest('<mi>&#x1D756;</mi>', 'sans serif negrita mayúscula Alfa', 'default');
  this.executeRuleTest('<mi>&#x1D790;</mi>', 'sans serif negrita cursiva mayúscula Alfa', 'default');
};


/**
 * Test for Unicode Latin mathfonts small letters.
 */
sre.MathspeakSpanishFontTest.prototype.testLatinMathfontsSmall = function() {
  this.executeRuleTest('<mi>&#x0061;</mi>', 'a', 'default');
  this.executeRuleTest('<mi>&#xFF41;</mi>', 'a', 'default');
  this.executeRuleTest('<mi>&#x1D41A;</mi>', 'negrita a', 'default');
  this.executeRuleTest('<mi>&#x1D44E;</mi>', 'cursiva a', 'default');
  this.executeRuleTest('<mi>&#x1D482;</mi>', 'negrita cursiva a', 'default');
  this.executeRuleTest('<mi>&#x1D4B6;</mi>', 'script a', 'default');
  this.executeRuleTest('<mi>&#x1D4EA;</mi>', 'negrita script a', 'default');
  this.executeRuleTest('<mi>&#x1D51E;</mi>', 'Fraktur a', 'default');
  this.executeRuleTest('<mi>&#x1D552;</mi>', 'negrita de pizarra a', 'default');
  this.executeRuleTest('<mi>&#x1D586;</mi>', 'negrita Fraktur a', 'default');
  this.executeRuleTest('<mi>&#x1D5BA;</mi>', 'sans serif a', 'default');
  this.executeRuleTest('<mi>&#x1D5EE;</mi>', 'sans serif negrita a', 'default');
  this.executeRuleTest('<mi>&#x1D622;</mi>', 'sans serif cursiva a', 'default');
  this.executeRuleTest('<mi>&#x1D656;</mi>', 'sans serif negrita cursiva a', 'default');
  this.executeRuleTest('<mi>&#x1D68A;</mi>', 'monoespacio a', 'default');
};


/**
 * Test for Unicode Greek mathfonts small letters.
 */
sre.MathspeakSpanishFontTest.prototype.testGreekMathfontsSmall = function() {
  this.executeRuleTest('<mi>&#x03B1;</mi>', 'alfa', 'default');
  this.executeRuleTest('<mi>&#x1D6C2;</mi>', 'negrita alfa', 'default');
  this.executeRuleTest('<mi>&#x1D6FC;</mi>', 'cursiva alfa', 'default');
  this.executeRuleTest('<mi>&#x1D736;</mi>', 'negrita cursiva alfa', 'default');
  this.executeRuleTest('<mi>&#x1D770;</mi>', 'sans serif negrita alfa', 'default');
  this.executeRuleTest('<mi>&#x1D7AA;</mi>', 'sans serif negrita cursiva alfa', 'default');
};


/**
 *  Part 2: Mathvariants
 */


/**
 * Test for Latin with mathvariant upper letters.
 */
sre.MathspeakSpanishFontTest.prototype.testLatinMathvariantUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">A</mi>', 'normal mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="bold">A</mi>', 'negrita mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="italic">A</mi>', 'mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">A</mi>', 'negrita cursiva mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="script">A</mi>', 'script mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">A</mi>', 'negrita script mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">A</mi>', 'Fraktur mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">A</mi>', 'negrita de pizarra mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">A</mi>', 'negrita Fraktur mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">A</mi>', 'sans serif mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">A</mi>', 'sans serif negrita mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">A</mi>', 'sans serif cursiva mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">A</mi>', 'sans serif negrita cursiva mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">A</mi>', 'monoespacio mayúscula A', 'default');
};


/**
 * Test for Latin with special MathJax mathvariants.
 */
sre.MathspeakSpanishFontTest.prototype.testLatinMathvariantMathJax = function() {
  this.executeRuleTest('<mi mathvariant="-tex-caligraphic">A</mi>', 'caligráfica mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-caligraphic-bold">A</mi>', 'caligráfica negrita mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-calligraphic">A</mi>', 'caligráfica mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-calligraphic-bold">A</mi>', 'caligráfica negrita mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-mathit">A</mi>', 'mayúscula A', 'default');
};


/**
 * Test for Greek with mathvariant upper letters.
 */
sre.MathspeakSpanishFontTest.prototype.testGreekMathvariantUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0391;</mi>', 'normal mayúscula Alfa', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x0391;</mi>', 'negrita mayúscula Alfa', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x0391;</mi>', 'mayúscula Alfa', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x0391;</mi>', 'negrita cursiva mayúscula Alfa', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x0391;</mi>', 'sans serif negrita mayúscula Alfa', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x0391;</mi>', 'sans serif negrita cursiva mayúscula Alfa', 'default');
};


/**
 * Test for Latin with mathvariant small letters.
 */
sre.MathspeakSpanishFontTest.prototype.testLatinMathvariantSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">a</mi>', 'normal a', 'default');
  this.executeRuleTest('<mi mathvariant="bold">a</mi>', 'negrita a', 'default');
  this.executeRuleTest('<mi mathvariant="italic">a</mi>', 'a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">a</mi>', 'negrita cursiva a', 'default');
  this.executeRuleTest('<mi mathvariant="script">a</mi>', 'script a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">a</mi>', 'negrita script a', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">a</mi>', 'Fraktur a', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">a</mi>', 'negrita de pizarra a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">a</mi>', 'negrita Fraktur a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">a</mi>', 'sans serif a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">a</mi>', 'sans serif negrita a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">a</mi>', 'sans serif cursiva a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">a</mi>', 'sans serif negrita cursiva a', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">a</mi>', 'monoespacio a', 'default');
};


/**
 * Test for Greek with mathvariant small letters.
 */
sre.MathspeakSpanishFontTest.prototype.testGreekMathvariantSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x03B1;</mi>', 'normal alfa', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x03B1;</mi>', 'negrita alfa', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x03B1;</mi>', 'alfa', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x03B1;</mi>', 'negrita cursiva alfa', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x03B1;</mi>', 'sans serif negrita alfa', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x03B1;</mi>', 'sans serif negrita cursiva alfa', 'default');
};


/**
 *  Part 3: Mathvariants and Unicode Characters
 */


/**
 * Test for Unicode Latin mathfonts with mathvariant upper letters.
 */
sre.MathspeakSpanishFontTest.prototype.testLatinFontVariantsUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0041;</mi>', 'normal mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="normal">&#xFF21;</mi>', 'normal mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D400;</mi>', 'negrita mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D434;</mi>', 'cursiva mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D468;</mi>', 'negrita cursiva mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="script">&#x1D49C;</mi>', 'script mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">&#x1D4D0;</mi>', 'negrita script mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">&#x1D504;</mi>', 'Fraktur mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">&#x1D538;</mi>', 'negrita de pizarra mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">&#x1D56C;</mi>', 'negrita Fraktur mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">&#x1D5A0;</mi>', 'sans serif mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D5D4;</mi>', 'sans serif negrita mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">&#x1D608;</mi>', 'sans serif cursiva mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D63C;</mi>', 'sans serif negrita cursiva mayúscula A', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">&#x1D670;</mi>', 'monoespacio mayúscula A', 'default');
};


/**
 * Test for Unicode Greek mathfonts with mathvariant upper letters.
 */
sre.MathspeakSpanishFontTest.prototype.testGreekFontVariantsUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0391;</mi>', 'normal mayúscula Alfa', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D6A8;</mi>', 'negrita mayúscula Alfa', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D6E2;</mi>', 'cursiva mayúscula Alfa', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D71C;</mi>', 'negrita cursiva mayúscula Alfa', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D756;</mi>', 'sans serif negrita mayúscula Alfa', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D790;</mi>', 'sans serif negrita cursiva mayúscula Alfa', 'default');
};


/**
 * Test for Unicode Latin mathfonts with mathvariant small letters.
 */
sre.MathspeakSpanishFontTest.prototype.testLatinFontVariantsSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0061;</mi>', 'normal a', 'default');
  this.executeRuleTest('<mi mathvariant="normal">&#xFF41;</mi>', 'normal a', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D41A;</mi>', 'negrita a', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D44E;</mi>', 'cursiva a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D482;</mi>', 'negrita cursiva a', 'default');
  this.executeRuleTest('<mi mathvariant="script">&#x1D4B6;</mi>', 'script a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">&#x1D4EA;</mi>', 'negrita script a', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">&#x1D51E;</mi>', 'Fraktur a', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">&#x1D552;</mi>', 'negrita de pizarra a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">&#x1D586;</mi>', 'negrita Fraktur a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">&#x1D5BA;</mi>', 'sans serif a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D5EE;</mi>', 'sans serif negrita a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">&#x1D622;</mi>', 'sans serif cursiva a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D656;</mi>', 'sans serif negrita cursiva a', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">&#x1D68A;</mi>', 'monoespacio a', 'default');
};


/**
 * Test for Unicode Greek mathfonts with mathvariant small letters.
 */
sre.MathspeakSpanishFontTest.prototype.testGreekFontVariantsSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x03B1;</mi>', 'normal alfa', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D6C2;</mi>', 'negrita alfa', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D6FC;</mi>', 'cursiva alfa', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D736;</mi>', 'negrita cursiva alfa', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D770;</mi>', 'sans serif negrita alfa', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D7AA;</mi>', 'sans serif negrita cursiva alfa', 'default');
};

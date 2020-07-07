// Copyright 2020 Volker Sorge
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

//
// This work was sponsored by ETH Zurich
//

/**
 * @fileoverview Tests for fonts. 
 *
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.ClearspeakGermanFontTest');

goog.require('sre.AbstractRuleTest');



/**
 * @constructor
 * @extends {sre.AbstractRuleTest}
 */
sre.ClearspeakGermanFontTest = function() {
  sre.ClearspeakGermanFontTest.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'Clearspeak German Font tests.';

  /**
   * @override
   */
  this.domain = 'clearspeak';

  /**
   * @override
   */
  this.locale = 'de';
  
  this.setActive('ClearspeakGermanFont');
};
goog.inherits(sre.ClearspeakGermanFontTest, sre.AbstractRuleTest);


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
sre.ClearspeakGermanFontTest.prototype.testLatinMathfontsUpper = function() {
  this.executeRuleTest('<mi>&#x0041;</mi>', 'A', 'default');
  this.executeRuleTest('<mi>&#xFF21;</mi>', 'A', 'default');
  this.executeRuleTest('<mi>&#x1D400;</mi>', 'fettes A', 'default');
  this.executeRuleTest('<mi>&#x1D434;</mi>', 'A', 'default');
  this.executeRuleTest('<mi>&#x1D468;</mi>', 'fettkursives A', 'default');
  this.executeRuleTest('<mi>&#x1D49C;</mi>', 'Schreibschrift A', 'default');
  this.executeRuleTest('<mi>&#x1D4D0;</mi>', 'fettes Schreibschrift A', 'default');
  this.executeRuleTest('<mi>&#x1D504;</mi>', 'Fraktur A', 'default');
  this.executeRuleTest('<mi>&#x1D538;</mi>', 'A mit Doppelstrich', 'default');
  this.executeRuleTest('<mi>&#x1D56C;</mi>', 'fettes Fraktur A', 'default');
  this.executeRuleTest('<mi>&#x1D5A0;</mi>', 'serifenloses A', 'default');
  this.executeRuleTest('<mi>&#x1D5D4;</mi>', 'serifenloses fettes A', 'default');
  this.executeRuleTest('<mi>&#x1D608;</mi>', 'serifenloses kursives A', 'default');
  this.executeRuleTest('<mi>&#x1D63C;</mi>', 'serifenloses fettkursives A', 'default');
  this.executeRuleTest('<mi>&#x1D670;</mi>', 'nichtproportionales A', 'default');
};


/**
 * Test for Unicode Greek mathfonts upper letters.
 */
sre.ClearspeakGermanFontTest.prototype.testGreekMathfontsUpper = function() {
  this.executeRuleTest('<mi>&#x0391;</mi>', 'Alpha', 'default');
  this.executeRuleTest('<mi>&#x1D6A8;</mi>', 'fettes Alpha', 'default');
  this.executeRuleTest('<mi>&#x1D6E2;</mi>', 'Alpha', 'default');
  this.executeRuleTest('<mi>&#x1D71C;</mi>', 'fettkursives Alpha', 'default');
  this.executeRuleTest('<mi>&#x1D756;</mi>', 'serifenloses fettes Alpha', 'default');
  this.executeRuleTest('<mi>&#x1D790;</mi>', 'serifenloses fettkursives Alpha', 'default');
};


/**
 * Test for Unicode Latin mathfonts small letters.
 */
sre.ClearspeakGermanFontTest.prototype.testLatinMathfontsSmall = function() { 
  this.executeRuleTest('<mi>&#x0061;</mi>', 'a', 'default');
  this.executeRuleTest('<mi>&#xFF41;</mi>', 'a', 'default');
  this.executeRuleTest('<mi>&#x1D41A;</mi>', 'fettes a', 'default');
  this.executeRuleTest('<mi>&#x1D44E;</mi>', 'a', 'default');
  this.executeRuleTest('<mi>&#x1D482;</mi>', 'fettkursives a', 'default');
  this.executeRuleTest('<mi>&#x1D4B6;</mi>', 'Schreibschrift a', 'default');
  this.executeRuleTest('<mi>&#x1D4EA;</mi>', 'fettes Schreibschrift a', 'default');
  this.executeRuleTest('<mi>&#x1D51E;</mi>', 'Fraktur a', 'default');
  this.executeRuleTest('<mi>&#x1D552;</mi>', 'a mit Doppelstrich', 'default');
  this.executeRuleTest('<mi>&#x1D586;</mi>', 'fettes Fraktur a', 'default');
  this.executeRuleTest('<mi>&#x1D5BA;</mi>', 'serifenloses a', 'default');
  this.executeRuleTest('<mi>&#x1D5EE;</mi>', 'serifenloses fettes a', 'default');
  this.executeRuleTest('<mi>&#x1D622;</mi>', 'serifenloses kursives a', 'default');
  this.executeRuleTest('<mi>&#x1D656;</mi>', 'serifenloses fettkursives a', 'default');
  this.executeRuleTest('<mi>&#x1D68A;</mi>', 'nichtproportionales a', 'default');
};


/**
 * Test for Unicode Greek mathfonts small letters.
 */
sre.ClearspeakGermanFontTest.prototype.testGreekMathfontsSmall = function() {
  this.executeRuleTest('<mi>&#x03B1;</mi>', 'alpha', 'default');
  this.executeRuleTest('<mi>&#x1D6C2;</mi>', 'fettes alpha', 'default');
  this.executeRuleTest('<mi>&#x1D6FC;</mi>', 'alpha', 'default');
  this.executeRuleTest('<mi>&#x1D736;</mi>', 'fettkursives alpha', 'default');
  this.executeRuleTest('<mi>&#x1D770;</mi>', 'serifenloses fettes alpha', 'default');
  this.executeRuleTest('<mi>&#x1D7AA;</mi>', 'serifenloses fettkursives alpha', 'default');
};


/**
 * Test for Unicode Latin mathfonts upper letters.
 */
sre.ClearspeakGermanFontTest.prototype.testLatinMathfontsUpperCaps = function() {
  this.executeRuleTest('<mi>&#x0041;</mi>', 'großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#xFF21;</mi>', 'großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D400;</mi>', 'fettes großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D434;</mi>', 'großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D468;</mi>', 'fettkursives großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D49C;</mi>', 'Schreibschrift großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D4D0;</mi>', 'fettes Schreibschrift großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D504;</mi>', 'Fraktur großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D538;</mi>', 'großes A mit Doppelstrich', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D56C;</mi>', 'fettes Fraktur großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D5A0;</mi>', 'serifenloses großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D5D4;</mi>', 'serifenloses fettes großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D608;</mi>', 'serifenloses kursives großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D63C;</mi>', 'serifenloses fettkursives großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D670;</mi>', 'nichtproportionales großes A', 'Caps_SayCaps');
};


/**
 * Test for Unicode Greek mathfonts upper letters.
 */
sre.ClearspeakGermanFontTest.prototype.testGreekMathfontsUpperCaps = function() {
  this.executeRuleTest('<mi>&#x0391;</mi>', 'großes Alpha', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D6A8;</mi>', 'fettes großes Alpha', 'Caps_SayCaps');
  // this.executeRuleTest('<mi>&#x1D6E2;</mi>', 'großes Alpha', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D71C;</mi>', 'fettkursives großes Alpha', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D756;</mi>', 'serifenloses fettes großes Alpha', 'Caps_SayCaps');
  this.executeRuleTest('<mi>&#x1D790;</mi>', 'serifenloses fettkursives großes Alpha', 'Caps_SayCaps');
};


/**
 *  Part 2: Mathvariants
 */

/**
 * Test for Latin with mathvariant upper letters.
 */
sre.ClearspeakGermanFontTest.prototype.testLatinMathvariantUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">A</mi>', 'normales A', 'default');
  this.executeRuleTest('<mi mathvariant="bold">A</mi>', 'fettes A', 'default');
  this.executeRuleTest('<mi mathvariant="italic">A</mi>', 'A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">A</mi>', 'fettkursives A', 'default');
  this.executeRuleTest('<mi mathvariant="script">A</mi>', 'Schreibschrift A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">A</mi>', 'fettes Schreibschrift A', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">A</mi>', 'Fraktur A', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">A</mi>', 'A mit Doppelstrich', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">A</mi>', 'fettes Fraktur A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">A</mi>', 'serifenloses A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">A</mi>', 'serifenloses fettes A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">A</mi>', 'serifenloses kursives A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">A</mi>', 'serifenloses fettkursives A', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">A</mi>', 'nichtproportionales A', 'default');
};


/**
 * Test for Latin with special MathJax mathvariants.
 */
sre.ClearspeakGermanFontTest.prototype.testLatinMathvariantMathJax = function() {
  this.executeRuleTest('<mi mathvariant="-tex-caligraphic">A</mi>', 'kalligrafisches A', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-caligraphic-bold">A</mi>', 'fettes kalligrafisches A', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-calligraphic">A</mi>', 'kalligrafisches A', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-calligraphic-bold">A</mi>', 'fettes kalligrafisches A', 'default');
  this.executeRuleTest('<mi mathvariant="-tex-mathit">A</mi>', 'A', 'default');
};


/**
 * Test for Greek with mathvariant upper letters.
 */
sre.ClearspeakGermanFontTest.prototype.testGreekMathvariantUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0391;</mi>', 'normales Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x0391;</mi>', 'fettes Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x0391;</mi>', 'Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x0391;</mi>', 'fettkursives Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x0391;</mi>', 'serifenloses fettes Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x0391;</mi>', 'serifenloses fettkursives Alpha', 'default');
};


/**
 * Test for Latin with mathvariant small letters.
 */
sre.ClearspeakGermanFontTest.prototype.testLatinMathvariantSmall = function() { 
  this.executeRuleTest('<mi mathvariant="normal">a</mi>', 'normales a', 'default');
  this.executeRuleTest('<mi mathvariant="bold">a</mi>', 'fettes a', 'default');
  this.executeRuleTest('<mi mathvariant="italic">a</mi>', 'a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">a</mi>', 'fettkursives a', 'default');
  this.executeRuleTest('<mi mathvariant="script">a</mi>', 'Schreibschrift a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">a</mi>', 'fettes Schreibschrift a', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">a</mi>', 'Fraktur a', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">a</mi>', 'a mit Doppelstrich', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">a</mi>', 'fettes Fraktur a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">a</mi>', 'serifenloses a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">a</mi>', 'serifenloses fettes a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">a</mi>', 'serifenloses kursives a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">a</mi>', 'serifenloses fettkursives a', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">a</mi>', 'nichtproportionales a', 'default');
};


/**
 * Test for Greek with mathvariant small letters.
 */
sre.ClearspeakGermanFontTest.prototype.testGreekMathvariantSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x03B1;</mi>', 'normales alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x03B1;</mi>', 'fettes alpha', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x03B1;</mi>', 'alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x03B1;</mi>', 'fettkursives alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x03B1;</mi>', 'serifenloses fettes alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x03B1;</mi>', 'serifenloses fettkursives alpha', 'default');
};


// The following do not work properly in Clearspeak. The leading font is dropped.
/**
 * Test for Latin with mathvariant upper letters.
 */
sre.ClearspeakGermanFontTest.prototype.testLatinMathvariantUpperCaps = function() {
  this.executeRuleTest('<mi mathvariant="normal">A</mi>', 'normales großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="bold">A</mi>', 'fettes großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="italic">A</mi>', 'großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="bold-italic">A</mi>', 'fettkursives großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="script">A</mi>', 'Schreibschrift großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="bold-script">A</mi>', 'fettes Schreibschrift großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="fraktur">A</mi>', 'Fraktur großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="double-struck">A</mi>', 'großes A mit Doppelstrich', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">A</mi>', 'fettes Fraktur großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="sans-serif">A</mi>', 'serifenloses großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">A</mi>', 'serifenloses fettes großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">A</mi>', 'serifenloses kursives großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">A</mi>', 'serifenloses fettkursives großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="monospace">A</mi>', 'nichtproportionales großes A', 'Caps_SayCaps');
};


/**
 * Test for Latin with special MathJax mathvariants.
 */
sre.ClearspeakGermanFontTest.prototype.testLatinMathvariantMathJaxCaps = function() {
  this.executeRuleTest('<mi mathvariant="-tex-caligraphic">A</mi>', 'kalligrafisches großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="-tex-caligraphic-bold">A</mi>', 'fettes kalligrafisches großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="-tex-calligraphic">A</mi>', 'kalligrafisches großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="-tex-calligraphic-bold">A</mi>', 'fettes kalligrafisches großes A', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="-tex-mathit">A</mi>', 'großes A', 'Caps_SayCaps');
};


/**
 * Test for Greek with mathvariant upper letters.
 */
sre.ClearspeakGermanFontTest.prototype.testGreekMathvariantUpperCaps = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0391;</mi>', 'normales großes Alpha', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="bold">&#x0391;</mi>', 'fettes großes Alpha', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="italic">&#x0391;</mi>', 'großes Alpha', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x0391;</mi>', 'fettkursives großes Alpha', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x0391;</mi>', 'serifenloses fettes großes Alpha', 'Caps_SayCaps');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x0391;</mi>', 'serifenloses fettkursives großes Alpha', 'Caps_SayCaps');
};


/**
 *  Part 3: Mathvariants and Unicode Characters
 */

/**
 * Test for Unicode Latin mathfonts with mathvariant upper letters.
 */
sre.ClearspeakGermanFontTest.prototype.testLatinFontVariantsUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0041;</mi>', 'normales A', 'default');
  this.executeRuleTest('<mi mathvariant="normal">&#xFF21;</mi>', 'normales A', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D400;</mi>', 'fettes A', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D434;</mi>', 'A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D468;</mi>', 'fettkursives A', 'default');
  this.executeRuleTest('<mi mathvariant="script">&#x1D49C;</mi>', 'Schreibschrift A', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">&#x1D4D0;</mi>', 'fettes Schreibschrift A', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">&#x1D504;</mi>', 'Fraktur A', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">&#x1D538;</mi>', 'A mit Doppelstrich', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">&#x1D56C;</mi>', 'fettes Fraktur A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">&#x1D5A0;</mi>', 'serifenloses A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D5D4;</mi>', 'serifenloses fettes A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">&#x1D608;</mi>', 'serifenloses kursives A', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D63C;</mi>', 'serifenloses fettkursives A', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">&#x1D670;</mi>', 'nichtproportionales A', 'default');
};


/**
 * Test for Unicode Greek mathfonts with mathvariant upper letters.
 */
sre.ClearspeakGermanFontTest.prototype.testGreekFontVariantsUpper = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x0391;</mi>', 'normales Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D6A8;</mi>', 'fettes Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D6E2;</mi>', 'Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D71C;</mi>', 'fettkursives Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D756;</mi>', 'serifenloses fettes Alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D790;</mi>', 'serifenloses fettkursives Alpha', 'default');
};


/**
 * Test for Unicode Latin mathfonts with mathvariant small letters.
 */
sre.ClearspeakGermanFontTest.prototype.testLatinFontVariantsSmall = function() { 
  this.executeRuleTest('<mi mathvariant="normal">&#x0061;</mi>', 'normales a', 'default');
  this.executeRuleTest('<mi mathvariant="normal">&#xFF41;</mi>', 'normales a', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D41A;</mi>', 'fettes a', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D44E;</mi>', 'a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D482;</mi>', 'fettkursives a', 'default');
  this.executeRuleTest('<mi mathvariant="script">&#x1D4B6;</mi>', 'Schreibschrift a', 'default');
  this.executeRuleTest('<mi mathvariant="bold-script">&#x1D4EA;</mi>', 'fettes Schreibschrift a', 'default');
  this.executeRuleTest('<mi mathvariant="fraktur">&#x1D51E;</mi>', 'Fraktur a', 'default');
  this.executeRuleTest('<mi mathvariant="double-struck">&#x1D552;</mi>', 'a mit Doppelstrich', 'default');
  this.executeRuleTest('<mi mathvariant="bold-fraktur">&#x1D586;</mi>', 'fettes Fraktur a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif">&#x1D5BA;</mi>', 'serifenloses a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D5EE;</mi>', 'serifenloses fettes a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-italic">&#x1D622;</mi>', 'serifenloses kursives a', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D656;</mi>', 'serifenloses fettkursives a', 'default');
  this.executeRuleTest('<mi mathvariant="monospace">&#x1D68A;</mi>', 'nichtproportionales a', 'default');
};


/**
 * Test for Unicode Greek mathfonts with mathvariant small letters.
 */
sre.ClearspeakGermanFontTest.prototype.testGreekFontVariantsSmall = function() {
  this.executeRuleTest('<mi mathvariant="normal">&#x03B1;</mi>', 'normales alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold">&#x1D6C2;</mi>', 'fettes alpha', 'default');
  this.executeRuleTest('<mi mathvariant="italic">&#x1D6FC;</mi>', 'alpha', 'default');
  this.executeRuleTest('<mi mathvariant="bold-italic">&#x1D736;</mi>', 'fettkursives alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold">&#x1D770;</mi>', 'serifenloses fettes alpha', 'default');
  this.executeRuleTest('<mi mathvariant="sans-serif-bold-italic">&#x1D7AA;</mi>', 'serifenloses fettkursives alpha', 'default');
};


/**
 * Test for Unicode mathfonts digits.
 */
sre.ClearspeakGermanFontTest.prototype.testDigitsMathfonts = function() {
  this.executeRuleTest('<mn>&#x0030;</mn>', '0', 'default');
  this.executeRuleTest('<mn>&#xFF10;</mn>', '0', 'default');
  this.executeRuleTest('<mn>&#x1D7CE;</mn>', 'fette 0', 'default');
  this.executeRuleTest('<mn>&#x1D7D8;</mn>', '0 mit Doppelstrich', 'default');
  this.executeRuleTest('<mn>&#x1D7E2;</mn>', 'serifenlose 0', 'default');
  this.executeRuleTest('<mn>&#x1D7EC;</mn>', 'serifenlose fette 0', 'default');
  this.executeRuleTest('<mn>&#x1D7F6;</mn>', 'nichtproportionale 0', 'default');
};


/**
 * Test for digits with mathvariant.
 */
sre.ClearspeakGermanFontTest.prototype.testDigitsMathvariant = function() {
  this.executeRuleTest('<mn mathvariant="normal">0</mn>', '0', 'default');
  this.executeRuleTest('<mn mathvariant="bold">0</mn>', 'fette 0', 'default');
  this.executeRuleTest('<mn mathvariant="italic">0</mn>', 'kursive 0', 'default');
  this.executeRuleTest('<mn mathvariant="bold-italic">0</mn>', 'fettkursive 0', 'default');
  this.executeRuleTest('<mn mathvariant="script">0</mn>', 'Schreibschrift 0', 'default');
  this.executeRuleTest('<mn mathvariant="bold-script">0</mn>', 'fette Schreibschrift 0', 'default');
  this.executeRuleTest('<mn mathvariant="fraktur">0</mn>', 'Fraktur 0', 'default');
  this.executeRuleTest('<mn mathvariant="double-struck">0</mn>', '0 mit Doppelstrich', 'default');
  this.executeRuleTest('<mn mathvariant="bold-fraktur">0</mn>', 'fette Fraktur 0', 'default');
  this.executeRuleTest('<mn mathvariant="sans-serif">0</mn>', 'serifenlose 0', 'default');
  this.executeRuleTest('<mn mathvariant="sans-serif-italic">0</mn>', 'serifenlose kursive 0', 'default');
  this.executeRuleTest('<mn mathvariant="sans-serif-bold-italic">0</mn>', 'serifenlose fettkursive 0', 'default');
  this.executeRuleTest('<mn mathvariant="monospace">0</mn>', 'nichtproportionale 0', 'default');
};


/**
 * Test for Unicode mathfonts digits with mathvariant.
 */
sre.ClearspeakGermanFontTest.prototype.testDigitsFontVariants = function() {
  this.executeRuleTest('<mn mathvariant="normal">&#x0030;</mn>', '0', 'default');
  this.executeRuleTest('<mn mathvariant="fullwidth">&#xFF10;</mn>', 'vollbreite 0', 'default');
  this.executeRuleTest('<mn mathvariant="bold">&#x1D7CE;</mn>', 'fette 0', 'default');
  this.executeRuleTest('<mn mathvariant="double-struck">&#x1D7D8;</mn>', '0 mit Doppelstrich', 'default');
  this.executeRuleTest('<mn mathvariant="sans-serif">&#x1D7E2;</mn>', 'serifenlose 0', 'default');
  this.executeRuleTest('<mn mathvariant="sans-serif-bold">&#x1D7EC;</mn>', 'serifenlose fette 0', 'default');
  this.executeRuleTest('<mn mathvariant="monospace">&#x1D7F6;</mn>', 'nichtproportionale 0', 'default');
};

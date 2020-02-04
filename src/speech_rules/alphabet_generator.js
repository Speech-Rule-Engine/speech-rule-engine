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

/**
 * @fileoverview Generator for simple speech rules wrt. symbol intervals of
 *     Unicode mappings.
 *
 */

goog.provide('sre.AlphabetGenerator');

goog.require('sre.L10n');
goog.require('sre.Messages');
goog.require('sre.SemanticUtil');


/**
 * Enumerator for Unicode fonts. These match the font elements in sre.Messages
 * @enum {string}
 */
sre.AlphabetGenerator.Font = {
  BOLD: 'bold',
  BOLDFRAKTUR: 'bold-fraktur',
  BOLDITALIC: 'bold-italic',
  BOLDSCRIPT: 'bold-script',
  DOUBLESTRUCK: 'double-struck',
  // DOUBLESTRUCKITALIC: 'double-struck-italic', // probably not needed.
  FULLWIDTH: 'fullwidth',
  FRAKTUR: 'fraktur',
  ITALIC: 'italic',
  MONOSPACE: 'monospace',
  NORMAL: 'normal',
  SCRIPT: 'script',
  SANSSERIF: 'sans-serif',
  SANSSERIFITALIC: 'sans-serif-italic',
  SANSSERIFBOLD: 'sans-serif-bold',
  SANSSERIFBOLDITALIC: 'sans-serif-bold-italic'
};


/**
 * Embellishing/modifying of Unicode characters. These match the embellish
 * elements in sre.Messages.
 * @enum {string}
 */
sre.AlphabetGenerator.Embellish = {
  SUPER: 'super',
  SUB: 'sub',
  CIRCLED: 'circled',
  PARENTHESIZED: 'parenthesized',
  PERIOD: 'period',
  NEGATIVECIRCLED: 'negative-circled',
  DOUBLECIRCLED: 'double-circled',
  CIRCLEDSANSSERIF: 'circled-sans-serif',
  NEGATIVECIRCLEDSANSSERIF: 'negative-circled-sans-serif',
  COMMA: 'comma',
  SQUARED: 'squared',
  NEGATIVESQUARED: 'negative-squared'
};


/**
 * Enumerator for alphabet bases.
 * @enum {string}
 */
sre.AlphabetGenerator.Base = {
  LATINCAP: 'latinCap',
  LATINSMALL: 'latinSmall',
  GREEKCAP: 'greekCap',
  GREEKSMALL: 'greekSmall',
  DIGIT: 'digit'
};


/**
 * Structure to hold domain combinations for a locale during rule generation.
 * @type {Object.<Array.<string>>}
 * @private
 */
sre.AlphabetGenerator.Domains_ = {
  small: ['default'],
  capital: ['default'],
  digit: ['default']
};


/**
 * Generates the domain combinations for the given locale.
 */
sre.AlphabetGenerator.makeDomains_ = function() {
  var prefs = sre.Messages.ALPHABET_PREFIXES;
  var trans = sre.Messages.ALPHABET_TRANSFORMERS;
  var combineKeys = function(obj1, obj2) {
    var result = {};
    Object.keys(obj1).forEach(function(k) {result[k] = true;});
    Object.keys(obj2).forEach(function(k) {result[k] = true;});
    return Object.keys(result);
  };
  sre.AlphabetGenerator.Domains_.small = combineKeys(
      prefs.smallPrefix, trans.letter);
  sre.AlphabetGenerator.Domains_.capital = combineKeys(
      prefs.capPrefix, trans.letter);
  sre.AlphabetGenerator.Domains_.digit = combineKeys(
      prefs.digitPrefix, trans.digit);
};


/**
 * Generates alphabet rules for the locale and adds them to the given store.
 * @param {string} locale The current locale.
 * @param {sre.MathCompoundStore} store The current speech rule store.
 */
sre.AlphabetGenerator.generate = function(locale, store) {
  sre.Engine.getInstance().locale = locale;
  sre.L10n.setLocale();
  store.addSymbolRules({locale: locale});
  sre.AlphabetGenerator.makeDomains_();
  var intervals = sre.AlphabetGenerator.INTERVALS;
  for (var i = 0, int; int = intervals[i]; i++) {
    var keys = sre.AlphabetGenerator.makeInterval(int.interval, int.subst);
    var letters = keys.map(function (x) {
      return sre.SemanticUtil.numberToUnicode(parseInt(x, 16));
    });
    if ('offset' in int) {
      sre.AlphabetGenerator.numberRules(
        store, keys, letters, int.font, int.category, int.offset || 0);
    } else {
      var alphabet = sre.Messages.ALPHABETS[int.base];
      sre.AlphabetGenerator.alphabetRules(
        store, keys, letters, alphabet, int.font, int.category, !!int.capital);
    }
  }
};


/**
 * Creates a list of unicode charactars from an interval specification.
 * @param {Array.<string>} int Pair of strings that represent the Unicode value
 *      of the start and end character in the interval.
 * @param {Object.<string|boolean>} subst Substitutions of characters in the
 *      above interval.
 * @return {Array.<number>} The generated interval of Unicode characters.
 */
sre.AlphabetGenerator.makeInterval = function(int, subst) {
  var num2str = function(x) {
    var str = i.toString(16).toUpperCase();
    return str.length > 3 ? str : ('000' + str).slice(-4);
  };
  var start = parseInt(int[0], 16);
  var end = parseInt(int[1], 16);
  var result = [];
  for (var i = start; i <= end; i++) {
    var key = num2str(i);
    var sub = subst[key];
    if (sub === false) continue;
    key = subst[key] || key;
    result.push(key);
  }
  return result;
};


/**
 * Retrieves font value for the current locale.
 * @param {string} font The font of an alphabet.
 * @return {{font: string, combiner: sre.Locale.Combiner}} The localised font
 *     value.
 */
sre.AlphabetGenerator.getFont = function(font) {
  let realFont = (font === 'normal' || font === 'fullwidth') ? '' :
      (sre.Messages.FONT[font] || sre.Messages.EMBELLISH[font] || '');
  return (typeof realFont === 'string') ?
    {font: realFont, combiner: sre.Messages.ALPHABET_COMBINER} :
  {font: realFont[0], combiner: realFont[1]};
};


/**
 * Generates rules for letters.
 * @param {sre.MathCompoundStore} store The compound store.
 * @param {Array.<number>} keys The unicode values to add.
 * @param {Array.<string>} unicodes The actual unicode characters corrsponding
 *     to the values in keys.
 * @param {Array.<string>} letters The letters of the corresponding alphabet.
 * @param {string} font The font name.
 * @param {string} category The category name.
 * @param {boolean} cap True if it is an alphabet of capitals.
 */
sre.AlphabetGenerator.alphabetRules = function(
  store, keys, unicodes, letters, font, category, cap) {
  var realFont = sre.AlphabetGenerator.getFont(font);
  for (var i = 0, key, unicode, letter;
       key = keys[i], unicode = unicodes[i], letter = letters[i]; i++) {
    var prefixes = cap ? sre.Messages.ALPHABET_PREFIXES.capPrefix :
        sre.Messages.ALPHABET_PREFIXES.smallPrefix;
    var domains = cap ? sre.AlphabetGenerator.Domains_.capital :
        sre.AlphabetGenerator.Domains_.small;
    sre.AlphabetGenerator.makeLetter(
      store, realFont.combiner, key, unicode, letter, realFont.font, prefixes, category,
      sre.Messages.ALPHABET_TRANSFORMERS.letter, domains);
  }
};


/**
 * Generates rules for numbers.
 * @param {sre.MathCompoundStore} store The compound store.
 * @param {Array.<number>} keys The unicode values to add.
 * @param {Array.<string>} unicodes The actual unicode characters corrsponding
 *     to the values in keys.
 * @param {string} font The font name.
 * @param {string} category The category name.
 * @param {number} offset The offset value for the initial number.
 */
sre.AlphabetGenerator.numberRules = function(
    store, keys, unicodes, font, category, offset) {
  var realFont = sre.AlphabetGenerator.getFont(font);
  for (var i = 0, key, unicode; key = keys[i], unicode = unicodes[i]; i++) {
    var prefixes = sre.Messages.ALPHABET_PREFIXES.digitPrefix;
    var number = i + offset;
    sre.AlphabetGenerator.makeLetter(
      store, realFont.combiner, key, unicode, number, realFont.font, prefixes, category,
      sre.Messages.ALPHABET_TRANSFORMERS.digit, sre.AlphabetGenerator.Domains_.digit);
  }
};

/**
 * Makes all rules for a single character.
 * @param {sre.MathCompoundStore} store The compound store.
 * @param {sre.Locale.Combiner} combiner The combining
 *     function for generating the rule action.
 * @param {number} key The unicode value of the character.
 * @param {string} unicode The actual unicode character.
 * @param {string|number} letter The letter of the corresponding alphabet or
 *     number.
 * @param {string} font The font name.
 * @param {Object.<string>} prefixes The prefixes for caps, small, or number.
 * @param {string} category The category name.
 * @param {Object.<sre.Locale.Transformer>} transformers The transformer method
 *      for the particular type of character.
 * @param {Array.<string>} domains The list of domains in which to create
 *     rules. They correspond to the union of the domains for prefixes and
 *     transformers.
 */
sre.AlphabetGenerator.makeLetter = function(
  store, combiner, key, unicode, letter, font, prefixes, category,
  transformers, domains) {
  for (var i = 0, domain; domain = domains[i]; i++) {
    var transformer = (domain in transformers) ? transformers[domain] : transformers['default'];
    var prefix = (domain in prefixes) ? prefixes[domain] : prefixes['default'];
    store.defineRule(key.toString(), domain, 'default', category, unicode, combiner(
      transformer(letter), font, prefix));
  };
};


/**
 * @typedef {{interval: Array.<string>,
 *         base: sre.AlphabetGenerator.Base,
 *         subst: Object.<string|boolean>,
 *         category: string,
 *         font: (sre.AlphabetGenerator.Font|sre.AlphabetGenerator.Embellish),
 *         capital: (boolean|undefined),
 *         offset: (number|undefined)
 *         }}
 */
sre.AlphabetGenerator.alphabet_;


/**
 * Alphabet definitions by intervals and exceptions
 * @type {Array.<sre.AlphabetGenerator.alphabet_>}
 */
sre.AlphabetGenerator.INTERVALS = [
  // Latin
  {
    interval: ['1D400', '1D419'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ['1D41A', '1D433'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ['1D56C', '1D585'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.BOLDFRAKTUR
  },
  {
    interval: ['1D586', '1D59F'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.BOLDFRAKTUR
  },
  {
    interval: ['1D468', '1D481'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.BOLDITALIC
  },
  {
    interval: ['1D482', '1D49B'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.BOLDITALIC
  },
  {
    interval: ['1D4D0', '1D4E9'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.BOLDSCRIPT
  },
  {
    interval: ['1D4EA', '1D503'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.BOLDSCRIPT
  },
  {
    interval: ['1D538', '1D551'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {
      '1D53A': '2102',
      '1D53F': '210D',
      '1D545': '2115',
      '1D547': '2119',
      '1D548': '211A',
      '1D549': '211D',
      '1D551': '2124'
    },
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.DOUBLESTRUCK
  },
  {
    interval: ['1D552', '1D56B'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.DOUBLESTRUCK
  },
  {
    interval: ['1D504', '1D51D'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {
      '1D506': '212D',
      '1D50B': '210C',
      '1D50C': '2111',
      '1D515': '211C',
      '1D51D': '2128'
    },
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.FRAKTUR
  },
  {
    interval: ['1D51E', '1D537'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.FRAKTUR
  },
  {
    interval: ['FF21', 'FF3A'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.FULLWIDTH
  },
  {
    interval: ['FF41', 'FF5A'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.FULLWIDTH
  },
  {
    interval: ['1D434', '1D44D'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.ITALIC
  },
  {
    interval: ['1D44E', '1D467'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {
      '1D455': '210E'
    },
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.ITALIC
  },
  {
    interval: ['1D670', '1D689'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.MONOSPACE
  },
  {
    interval: ['1D68A', '1D6A3'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.MONOSPACE
  },
  {
    interval: ['0041', '005A'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ['0061', '007A'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ['1D49C', '1D4B5'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {
      '1D49D': '212C',
      '1D4A0': '2130',
      '1D4A1': '2131',
      '1D4A3': '210B',
      '1D4A4': '2110',
      '1D4A7': '2112',
      '1D4A8': '2133',
      '1D4AD': '211B'
    },
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.SCRIPT
  },
  {
    interval: ['1D4B6', '1D4CF'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {
      '1D4BA': '212F',
      '1D4BC': '210A',
      '1D4C4': '2134'
    },
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.SCRIPT
  },
  {
    interval: ['1D5A0', '1D5B9'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.SANSSERIF
  },
  {
    interval: ['1D5BA', '1D5D3'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.SANSSERIF
  },
  {
    interval: ['1D608', '1D621'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.SANSSERIFITALIC
  },
  {
    interval: ['1D622', '1D63B'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.SANSSERIFITALIC
  },
  {
    interval: ['1D5D4', '1D5ED'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ['1D5EE', '1D607'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ['1D63C', '1D655'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ['1D656', '1D66F'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLDITALIC
  },
  // Greek
  {
    interval: ['1D71C', '1D734'],
    base: sre.AlphabetGenerator.Base.GREEKCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.BOLDITALIC
  },
  {
    interval: ['1D736', '1D74E'],
    base: sre.AlphabetGenerator.Base.GREEKSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.BOLDITALIC
  },
  {
    interval: ['1D6A8', '1D6C0'],
    base: sre.AlphabetGenerator.Base.GREEKCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ['1D6C2', '1D6DA'],
    base: sre.AlphabetGenerator.Base.GREEKSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ['1D6E2', '1D6FA'],
    base: sre.AlphabetGenerator.Base.GREEKCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.ITALIC
  },
  {
    interval: ['1D6FC', '1D714'],
    base: sre.AlphabetGenerator.Base.GREEKSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.ITALIC
  },
  {
    interval: ['1D790', '1D7A8'],
    base: sre.AlphabetGenerator.Base.GREEKCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ['1D7AA', '1D7C2'],
    base: sre.AlphabetGenerator.Base.GREEKSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ['1D756', '1D76E'],
    base: sre.AlphabetGenerator.Base.GREEKCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ['1D770', '1D788'],
    base: sre.AlphabetGenerator.Base.GREEKSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ['0391', '03A9'],
    base: sre.AlphabetGenerator.Base.GREEKCAP,
    subst: {
      '03A2': '03F4'
    },
    capital: true,
    category: 'Lu',
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ['03B1', '03C9'],
    base: sre.AlphabetGenerator.Base.GREEKSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  // Digits
    {
    interval: ['0030', '0039'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ['2070', '2079'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {
      '2071': '00B9',
      '2072': '00B2',
      '2073': '00B3'
    },
    offset: 0,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.SUPER
  },
  {
    interval: ['2080', '2089'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.SUB
  },
  {
    interval: ['245F', '2473'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {
      '245F': '24EA'
    },
    offset: 0,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.CIRCLED
  },
  {
    interval: ['3251', '325F'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 21,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.CIRCLED
  },
  {
    interval: ['32B1', '32BF'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 36,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.CIRCLED
  },
  {
    interval: ['2474', '2487'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 1,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.PARENTHESIZED // (start at 1)
  },
  {
    interval: ['2487', '249B'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {
      '2487': '1F100'
    },
    offset: 0,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.PERIOD
  },
  {
    interval: ['2775', '277F'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {
      '2775': '24FF'
    },
    offset: 0,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.NEGATIVECIRCLED
  },
  {
    interval: ['24EB', '24F4'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 11,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.NEGATIVECIRCLED
  },
  {
    interval: ['24F5', '24FE'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 1,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.DOUBLECIRCLED // (starts at 1)
  },
  {
    interval: ['277F', '2789'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {
      '277F': '1F10B'
    },
    offset: 0,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.CIRCLEDSANSSERIF // (0 is NEW)
  },
  {
    interval: ['2789', '2793'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {
      '2789': '1F10C'
    },
    offset: 0,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.NEGATIVECIRCLEDSANSSERIF //  (0 is NEW!)
  },
  {
    interval: ['FF10', 'FF19'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: sre.AlphabetGenerator.Font.FULLWIDTH
  },
  {
    interval: ['1D7CE', '1D7D7'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ['1D7D8', '1D7E1'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: sre.AlphabetGenerator.Font.DOUBLESTRUCK
  },
  {
    interval: ['1D7E2', '1D7EB'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: sre.AlphabetGenerator.Font.SANSSERIF
  },
  {
    interval: ['1D7EC', '1D7F5'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ['1D7F6', '1D7FF'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: sre.AlphabetGenerator.Font.MONOSPACE
  },
  {
    interval: ['1F101', '1F10A'],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'No',
    font: sre.AlphabetGenerator.Embellish.COMMA
  },
  // Other alphabets
  {
    interval: ['1F110', '1F129'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'So',
    font: sre.AlphabetGenerator.Embellish.PARENTHESIZED
  },
  {
    interval: ['249C', '24B5'],
    base: sre.AlphabetGenerator.Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'So',
    font: sre.AlphabetGenerator.Embellish.PARENTHESIZED
  },
  {
    interval: ['24B6', '24CF'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'So',
    font: sre.AlphabetGenerator.Embellish.CIRCLED
  },
  {
    interval: ['24D0', '24E9'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: false,
    category: 'So',
    font: sre.AlphabetGenerator.Embellish.CIRCLED
  },
  {
    interval: ['1F130', '1F149'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'So',
    font: sre.AlphabetGenerator.Embellish.SQUARED
  },
  {
    interval: ['1F170', '1F189'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'So',
    font: sre.AlphabetGenerator.Embellish.NEGATIVESQUARED
  },
  {
    interval: ['1F150', '1F169'],
    base: sre.AlphabetGenerator.Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'So',
    font: sre.AlphabetGenerator.Embellish.NEGATIVECIRCLED
  }
  
];


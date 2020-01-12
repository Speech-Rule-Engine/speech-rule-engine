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
 * @fileoverview Symbol intervals for Unicode mappings.
 *
 */

goog.provide('sre.AlphabetGenerator');

// goog.require('sre.SemanticUtil');


// sre.AlphabetGenerator = function() {};

/**
 * Enumerator for Unicode fonts.
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
  SANSSERIFBOLDITALIC: 'sans-serif-bold-italic',
  // Digit specific. More embellishments than fonts.
  SUPER: 'super',
  SUB: 'sub',
  CIRCLED: 'circled',
  PARENTHESIZED: 'parenthesized',
  PERIOD: 'period',
  NEGATIVECIRCLED: 'negative-circled',
  DOUBLECIRCLED: 'double-circled',
  CIRCLEDSANSSERIF: 'circled-sans-serif',
  NEGATIVECIRCLEDSANSSERIF: 'negative-circled-sans-serif',
  BLACKBOARD: 'blackboard',
  COMMA: 'comma'
};


/**
 * Enumerator for alphabet bases.
 * @enum {string}
 */
sre.AlphabetGenerator.Base = {
  LATIN: 'latin',
  GREEK: 'greek',
  DIGIT: 'digit'
};


sre.AlphabetGenerator.generate = function(locale, store) {
  store.addSymbolRules({locale: locale}); // How do I get that? Make intervals per locale.
  var intervals = sre.AlphabetGenerator.INTERVALS;
  for (var i = 0, int; int = intervals[i]; i++) {
    var keys = sre.AlphabetGenerator.makeInterval(int.interval, int.subst);
    var letters = keys.map(function (x) {
      return sre.SemanticUtil.numberToUnicode(parseInt(x, 16));
    });
    sre.AlphabetGenerator.makeSpeech(store, keys, letters, int.capital, int.font, int.base);
  }
};


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
    key = subst[key] || key;
    result.push(key);
  }
  return result;
};




sre.AlphabetGenerator.capitalise = function(str) {
  return str[0].toUpperCase() + str.slice(1);
};


// Those need to be localised in messages!
var baseAlphabets = {
  latin: [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ],
  latinCap: [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ],
  Greek: [
    'alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta',
    'iota', 'kappa', 'lamda', 'mu', 'nu', 'xi', 'omicron', 'pi', 'rho',
    'final sigma', 'sigma', 'tau', 'upsilon', 'phi', 'chi', 'psi', 'omega'
  ],
  greekCap: [
    'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta',
    'Iota', 'Kappa', 'Lamda', 'Mu', 'Nu', 'Xi', 'Omicron', 'Pi', 'Rho',
    'Sigma', 'Tau', 'Upsilon', 'Phi', 'Chi', 'Psi', 'Omega'
  ]
};

// Maybe just generate a single one? In case of English it can be the identity.
var baseDigits = function(a, b) {
  var res = [];
  for (var i = a; i <= b; i++) {
    res.push(i);
  }
  return res;
};


var capPrefix = {default: 'cap', mathspeak: 'upper'};

var smallPrefix = {default: ''};

var combiner = function(letter, font, cap) {
  letter = cap ? cap + ' ' + letter : letter;
  return font ? font + ' ' + letter : letter;
};

sre.AlphabetGenerator.getFont = function(font) {
  return (font === 'normal' || font === 'fullwidth') ? '' : sre.Locale.en.FONT[font];
};

sre.AlphabetGenerator.makeSpeech = function(
  store, keys, unicodes, cap, font, base) {
  var letters = baseAlphabets[base + (cap ? 'Cap' : '')];
  var realFont = sre.AlphabetGenerator.getFont(font);
  for (var i = 0, key, unicode, letter;
       key = keys[i], unicode = unicodes[i], letter = letters[i]; i++) {
    sre.AlphabetGenerator.makeLetter(store, combiner, key, unicode, letter,
                                   realFont, cap ? capPrefix : smallPrefix, cap);
  }
};

// Assume style is always default.
sre.AlphabetGenerator.makeLetter = function(
  store, combiner, key, unicode, letter, font, prefix, cap) {
  var mappings = {};
  var domains = Object.keys(prefix);
  for (var i = 0, domain; domain = domains[i]; i++) {
    mappings[domain] = {'default': combiner(letter, font, prefix[domain])};
  };
  store.defineRules(key, unicode, cap ? 'Lu' : 'Ll', mappings);
};


sre.AlphabetGenerator.INTERVALS = [
  // Latin
  {
    interval: ['1D400', '1D419'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ['1D41A', '1D433'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ['1D56C', '1D585'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.BOLDFRAKTUR
  },
  {
    interval: ['1D586', '1D59F'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.BOLDFRAKTUR
  },
  {
    interval: ['1D468', '1D481'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.BOLDITALIC
  },
  {
    interval: ['1D482', '1D49B'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.BOLDITALIC
  },
  {
    interval: ['1D4D0', '1D4E9'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.BOLDSCRIPT
  },
  {
    interval: ['1D4EA', '1D503'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.BOLDSCRIPT
  },
  {
    interval: ['1D538', '1D551'],
    base: sre.AlphabetGenerator.Base.LATIN,
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
    font: sre.AlphabetGenerator.Font.DOUBLESTRUCK
  },
  {
    interval: ['1D552', '1D56B'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.DOUBLESTRUCK
  },
  {
    interval: ['1D504', '1D51D'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {
      '1D506': '212D',
      '1D50B': '210C',
      '1D50C': '2111',
      '1D515': '211C',
      '1D51D': '2128'
    },
    capital: true,
    font: sre.AlphabetGenerator.Font.FRAKTUR
  },
  {
    interval: ['1D51E', '1D537'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.FRAKTUR
  },
  {
    interval: ['FF21', 'FF3A'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.FULLWIDTH
  },
  {
    interval: ['FF41', 'FF5A'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.FULLWIDTH
  },
  {
    interval: ['1D434', '1D44D'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.ITALIC
  },
  {
    interval: ['1D44E', '1D467'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {
      '1D455': '210E'
    },
    capital: false,
    font: sre.AlphabetGenerator.Font.ITALIC
  },
  {
    interval: ['1D670', '1D689'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.MONOSPACE
  },
  {
    interval: ['1D68A', '1D6A3'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.MONOSPACE
  },
  {
    interval: ['0041', '005A'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ['0061', '007A'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ['1D49C', '1D4B5'],
    base: sre.AlphabetGenerator.Base.LATIN,
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
    font: sre.AlphabetGenerator.Font.SCRIPT
  },
  {
    interval: ['1D4B6', '1D4CF'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {
      '1D4BA': '212F',
      '1D4BC': '210A',
      '1D4C4': '2134'
    },
    capital: false,
    font: sre.AlphabetGenerator.Font.SCRIPT
  },
  {
    interval: ['1D5A0', '1D5B9'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.SANSSERIF
  },
  {
    interval: ['1D5BA', '1D5D3'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.SANSSERIF
  },
  {
    interval: ['1D608', '1D621'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.SANSSERIFITALIC
  },
  {
    interval: ['1D622', '1D63B'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.SANSSERIFITALIC
  },
  {
    interval: ['1D5D4', '1D5ED'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ['1D5EE', '1D607'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ['1D63C', '1D655'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ['1D656', '1D66F'],
    base: sre.AlphabetGenerator.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLDITALIC
  },
  // Greek
  {
    interval: ["1D71C", "1D734"],
    base: sre.AlphabetGenerator.Base.GREEK,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.BOLDITALIC
  },
  {
    interval: ["1D736", "1D74E"],
    base: sre.AlphabetGenerator.Base.GREEK,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.BOLDITALIC
  },
  {
    interval: ["1D6A8", "1D6C0"],
    base: sre.AlphabetGenerator.Base.GREEK,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ["1D6C2", "1D6DA"],
    base: sre.AlphabetGenerator.Base.GREEK,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ["1D6E2", "1D6FA"],
    base: sre.AlphabetGenerator.Base.GREEK,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.ITALIC
  },
  {
    interval: ["1D6FC", "1D714"],
    base: sre.AlphabetGenerator.Base.GREEK,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.ITALIC
  },
  {
    interval: ["1D790", "1D7A8"],
    base: sre.AlphabetGenerator.Base.GREEK,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ["1D7AA", "1D7C2"],
    base: sre.AlphabetGenerator.Base.GREEK,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ["1D756", "1D76E"],
    base: sre.AlphabetGenerator.Base.GREEK,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ["1D770", "1D788"],
    base: sre.AlphabetGenerator.Base.GREEK,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ["0391", "03A9"],
    base: sre.AlphabetGenerator.Base.GREEK,
    subst: {},
    capital: true,
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ["03B1", "03C9"],
    base: sre.AlphabetGenerator.Base.GREEK,
    subst: {},
    capital: false,
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  // Digits
    {
    interval: ["0030", "0039"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.NORMAL
  },
  {
    interval: ["2070", "2079"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {
      '2071': "00B9",
      '2072': "00B2",
      '2073': "00B3"
    },
    offset: 0,
    font: sre.AlphabetGenerator.Font.SUPER
  },
  {
    interval: ["2080", "2089"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.SUB
  },
  {
    interval: ["245F", "2473"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {
      "245F": "24EA"
    },
    offset: 0,
    font: sre.AlphabetGenerator.Font.CIRCLED
  },
  {
    interval: ["3251", "325F"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 21,
    font: sre.AlphabetGenerator.Font.CIRCLED
  },
  {
    interval: ["32B1", "32BF"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 36,
    font: sre.AlphabetGenerator.Font.CIRCLED
  },
  {
    interval: ["2474", "2487"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 1,
    font: sre.AlphabetGenerator.Font.PARENTHESIZED // (start at 1)
  },
  {
    interval: ["1F100", "249B"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.PERIOD
  },
  {
    interval: ["24FF", "24F4"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.NEGATIVECIRCLED
  },
  {
    interval: ["24F5", "24FE"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 1,
    font: sre.AlphabetGenerator.Font.DOUBLECIRCLED // (starts at 1)
  },
  {
    interval: ["1F10B", "2789"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.CIRCLEDSANSSERIF // (0 is NEW)
  },
  {
    interval: ["1F10C", "2793"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.NEGATIVECIRCLEDSANSSERIF //  (0 is NEW!)
  },
  {
    interval: ["FF10", "FF19"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.FULLWIDTH
  },
  {
    interval: ["1D7CE", "1D7D7"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.BOLD
  },
  {
    interval: ["1D7D8", "1D7E1"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.BLACKBOARD
  },
  {
    interval: ["1D7E2", "1D7EB"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.SANSSERIF
  },
  {
    interval: ["1D7EC", "1D7F5"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.SANSSERIFBOLD
  },
  {
    interval: ["1D7F6", "1D7FF"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.MONOSPACE
  },
  {
    interval: ["1F101", "1F10A"],
    base: sre.AlphabetGenerator.Base.DIGIT,
    subst: {},
    offset: 0,
    font: sre.AlphabetGenerator.Font.COMMA
  }
];


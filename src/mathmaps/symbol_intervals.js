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

goog.provide('sre.SymbolIntervals');

// goog.require('sre.SemanticUtil');


// sre.SymbolIntervals = function() {};

/**
 * Enumerator for Unicode fonts.
 * @enum {string}
 */
sre.SymbolIntervals.Font = {
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
 * Enumerator for alphabet bases.
 * @enum {string}
 */
sre.SymbolIntervals.Base = {
  LATIN: 'latin',
  GREEK: 'greek',
  DIGIT: 'digit'
};


var latinCap = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

sre.SymbolIntervals.makeIntervals = function() {
  var intervals = sre.SymbolIntervals.LATIN;
  for (var i = 0, int; int = intervals[i]; i++) {
    var keys = sre.SymbolIntervals.makeInterval(int.interval, int.subst);
    console.log(keys);
  } 
};


sre.SymbolIntervals.experimental = function() {
  var int = sre.SymbolIntervals.LATIN[12];
  var keys = sre.SymbolIntervals.makeInterval(int.interval, int.subst);
  console.log(keys);
};

sre.SymbolIntervals.makeInterval = function (int, subst) {
  var start = parseInt(int[0], 16);
  var end = parseInt(int[1], 16);
  var result = [];
  for (var i = start; i <= end; i++) {
    var sub = subst[i.toString(16).toUpperCase()];
    var number = sre.SemanticUtil.numberToUnicode(sub ? parseInt(sub, 16) : i);
    console.log(i + ': ' + number);
    result.push(number);
  }
  return result;
};


sre.SymbolIntervals.LATIN = [
  {
    interval: ['1D400', '1D419'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.SymbolIntervals.Font.BOLD
  },
  {
    interval: ['1D41A', '1D433'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.BOLD
  },
  {
    interval: ['1D56C', '1D585'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.SymbolIntervals.Font.BOLDFRAKTUR
  },
  {
    interval: ['1D586', '1D59F'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.BOLDFRAKTUR
  },
  {
    interval: ['1D468', '1D481'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.SymbolIntervals.Font.BOLDITALIC
  },
  {
    interval: ['1D482', '1D49B'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.BOLDITALIC
  },
  {
    interval: ['1D4D0', '1D4E9'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.SymbolIntervals.Font.BOLDSCRIPT
  },
  {
    interval: ['1D4EA', '1D503'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.BOLDSCRIPT
  },
  {
    interval: ['1D538', '1D551'],
    base: sre.SymbolIntervals.Base.LATIN,
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
    font: sre.SymbolIntervals.Font.DOUBLESTRUCK
  },
  {
    interval: ['1D552', '1D56B'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.DOUBLESTRUCK
  },
  {
    interval: ['1D504', '1D51D'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {
      '1D506': '212D',
      '1D50B': '210C',
      '1D50C': '2111',
      '1D515': '211C',
      '1D51D': '2128'
    },
    capital: true,
    font: sre.SymbolIntervals.Font.FRAKTUR
  },
  {
    interval: ['1D51E', '1D537'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.FRAKTUR
  },
  {
    interval: ['FF21', 'FF3A'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.SymbolIntervals.Font.FULLWIDTH
  },
  {
    interval: ['FF41', 'FF5A'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.FULLWIDTH
  },
  {
    interval: ['1D434', '1D44D'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.SymbolIntervals.Font.ITALIC
  },
  {
    interval: ['1D44E', '1D467'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {
      '1D455': '210E'
    },
    capital: false,
    font: sre.SymbolIntervals.Font.ITALIC
  },
  {
    interval: ['1D670', '1D689'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.SymbolIntervals.Font.MONOSPACE
  },
  {
    interval: ['1D68A', '1D6A3'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.MONOSPACE
  },
  {
    interval: ['0041', '005A'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.SymbolIntervals.Font.NORMAL
  },
  {
    interval: ['0061', '007A'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.NORMAL
  },
  {
    interval: ['1D49C', '1D4B5'],
    base: sre.SymbolIntervals.Base.LATIN,
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
    font: sre.SymbolIntervals.Font.SCRIPT
  },
  {
    interval: ['1D4B6', '1D4CF'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {
      '1D4BA': '212F',
      '1D4BC': '210A',
      '1D4C4': '2134'
    },
    capital: false,
    font: sre.SymbolIntervals.Font.SCRIPT
  },
  {
    interval: ['1D5A0', '1D5B9'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.SymbolIntervals.Font.SANSSERIF
  },
  {
    interval: ['1D5BA', '1D5D3'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.SANSSERIF
  },
  {
    interval: ['1D608', '1D621'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.SymbolIntervals.Font.SANSSERIFITALIC
  },
  {
    interval: ['1D622', '1D63B'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.SANSSERIFITALIC
  },
  {
    interval: ['1D5D4', '1D5ED'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.SymbolIntervals.Font.SANSSERIFBOLD
  },
  {
    interval: ['1D5EE', '1D607'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.SANSSERIFBOLD
  },
  {
    interval: ['1D63C', '1D655'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: true,
    font: sre.SymbolIntervals.Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ['1D656', '1D66F'],
    base: sre.SymbolIntervals.Base.LATIN,
    subst: {},
    capital: false,
    font: sre.SymbolIntervals.Font.SANSSERIFBOLDITALIC
  }
];


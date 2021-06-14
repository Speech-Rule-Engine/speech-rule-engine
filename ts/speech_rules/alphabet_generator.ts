//
// Copyright 2020-21 Volker Sorge
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

import {Engine} from '../common/engine';
import * as L10n from '../l10n/l10n';
import {Locale} from '../l10n/messages';
import {Combiner, Transformer} from '../l10n/transformers';
import {MathCompoundStore, UnicodeJson} from '../rule_engine/math_simple_store';
import * as SemanticUtil from '../semantic_tree/semantic_util';


/**
 * Enumerator for Unicode fonts. These match the font elements in sre.Messages
 */
export enum Font {
  BOLD = 'bold',
  BOLDFRAKTUR = 'bold-fraktur',
  BOLDITALIC = 'bold-italic',
  BOLDSCRIPT = 'bold-script',
  DOUBLESTRUCK = 'double-struck',
  // DOUBLESTRUCKITALIC: 'double-struck-italic', // probably not needed.
  FULLWIDTH = 'fullwidth',
  FRAKTUR = 'fraktur',
  ITALIC = 'italic',
  MONOSPACE = 'monospace',
  NORMAL = 'normal',
  SCRIPT = 'script',
  SANSSERIF = 'sans-serif',
  SANSSERIFITALIC = 'sans-serif-italic',
  SANSSERIFBOLD = 'sans-serif-bold',
  SANSSERIFBOLDITALIC = 'sans-serif-bold-italic'
}


/**
 * Embellishing/modifying of Unicode characters. These match the embellish
 * elements in sre.Messages.
 */
export enum Embellish {
  SUPER = 'super',
  SUB = 'sub',
  CIRCLED = 'circled',
  PARENTHESIZED = 'parenthesized',
  PERIOD = 'period',
  NEGATIVECIRCLED = 'negative-circled',
  DOUBLECIRCLED = 'double-circled',
  CIRCLEDSANSSERIF = 'circled-sans-serif',
  NEGATIVECIRCLEDSANSSERIF = 'negative-circled-sans-serif',
  COMMA = 'comma',
  SQUARED = 'squared',
  NEGATIVESQUARED = 'negative-squared'
}


/**
 * Enumerator for alphabet bases.
 */
export enum Base {
  LATINCAP = 'latinCap',
  LATINSMALL = 'latinSmall',
  GREEKCAP = 'greekCap',
  GREEKSMALL = 'greekSmall',
  DIGIT = 'digit'
}


/**
 * Structure to hold domain combinations for a locale during rule generation.
 */
export const Domains_: {[key: string]: string[]} = {
  small: ['default'],
  capital: ['default'],
  digit: ['default']
};


/**
 * Generates the domain combinations for the given locale.
 */
export function makeDomains_() {
  let alph = Locale.ALPHABETS;
  let combineKeys =
    (obj1: {[key: string]: any},
     obj2: {[key: string]: any}) => {
       let result: {[key: string]: boolean} = {};
       Object.keys(obj1).forEach(k => result[k] = true)
       Object.keys(obj2).forEach(k => result[k] = true)
    return Object.keys(result);
  };
  Domains_.small = combineKeys(alph.smallPrefix, alph.letterTrans);
  Domains_.capital = combineKeys(alph.capPrefix, alph.letterTrans);
  Domains_.digit = combineKeys(alph.digitPrefix, alph.digitTrans);
}


/**
 * Generates alphabet rules for the locale and adds them to the given store.
 * @param locale The current locale.
 * @param store The current speech rule store.
 */
export function generate(locale: string) {
  let oldLocale = Engine.getInstance().locale;
  Engine.getInstance().locale = locale;
  L10n.setLocale();
  MathCompoundStore.addSymbolRules({locale: locale} as UnicodeJson);
  makeDomains_();
  let intervals = INTERVALS;
  for (let i = 0, int; int = intervals[i]; i++) {
    let keys = makeInterval(int.interval, int.subst);
    let letters = keys.map(function(x) {
      return SemanticUtil.numberToUnicode(parseInt(x, 16));
    });
    if ('offset' in int) {
      numberRules(
          keys, letters, int.font, int.category, int.offset || 0);
    } else {
      let alphabet = (Locale.ALPHABETS as any)[int.base];
      alphabetRules(
          keys, letters, alphabet, int.font, int.category,
          !!int.capital);
    }
  }
  Engine.getInstance().locale = oldLocale;
  L10n.setLocale();
}


/**
 * Translate number to string with at least four characters.
 * @param num The number.
 * @return The resulting string padded with 0 if necessary.
 */
function num2str(num: number): string {
  let str = num.toString(16).toUpperCase();
  return str.length > 3 ? str : ('000' + str).slice(-4);
}


/**
 * Creates a list of unicode charactars from an interval specification.
 * @param int Pair of strings that represent the Unicode value
 *      of the start and end character in the interval.
 * @param subst Substitutions of characters in the
 *      above interval.
 * @return The generated interval of Unicode characters.
 */
export function makeInterval([a, b]: [string, string],
                             subst: {[key: string]: string|boolean}): string[] {
  let start = parseInt(a, 16);
  let end = parseInt(b, 16);
  let result = [];
  for (let i = start; i <= end; i++) {
    let key = num2str(i);
    let sub = subst[key];
    // TODO (TS): Check if this can be simplified by removing the boolean case.
    if (sub === false) {
      continue;
    }
    key = subst[key] as any || key;
    result.push(key);
  }
  return result;
}


/**
 * Retrieves font value for the current locale.
 * @param font The font of an alphabet.
 * @return The localised font
 *     value.
 */
export function getFont(font: string): {font: string, combiner: Combiner} {
  let realFont = font === 'normal' || font === 'fullwidth' ?
      '' :
      Locale.FONT[font] || Locale.EMBELLISH[font] || '';
  return typeof realFont === 'string' ?
      {font: realFont, combiner: Locale.ALPHABETS.combiner} :
      {font: realFont[0], combiner: realFont[1]};
}


/**
 * Generates rules for letters.
 * @param store The compound store.
 * @param keys The unicode values to add.
 * @param unicodes The actual unicode characters corrsponding
 *     to the values in keys.
 * @param letters The letters of the corresponding alphabet.
 * @param font The font name.
 * @param category The category name.
 * @param cap True if it is an alphabet of capitals.
 */
export function alphabetRules(keys: string[], unicodes: string[],
    letters: string[], font: string, category: string, cap: boolean) {
  let realFont = getFont(font);
  for (let i = 0, key, unicode, letter;
       key = keys[i], unicode = unicodes[i], letter = letters[i]; i++) {
    let prefixes = cap ? Locale.ALPHABETS.capPrefix :
                         Locale.ALPHABETS.smallPrefix;
    let domains = cap ? Domains_.capital : Domains_.small;
    makeLetter(realFont.combiner, key, unicode, letter, realFont.font, prefixes,
        category, Locale.ALPHABETS.letterTrans, domains);
  }
}


/**
 * Generates rules for numbers.
 * @param store The compound store.
 * @param keys The unicode values to add.
 * @param unicodes The actual unicode characters corrsponding
 *     to the values in keys.
 * @param font The font name.
 * @param category The category name.
 * @param offset The offset value for the initial number.
 */
export function numberRules(keys: string[], unicodes: string[], font: string,
    category: string, offset: number) {
  let realFont = getFont(font);
  for (let i = 0, key, unicode; key = keys[i], unicode = unicodes[i]; i++) {
    let prefixes = Locale.ALPHABETS.digitPrefix;
    let num = i + offset;
    makeLetter(realFont.combiner, key, unicode, num, realFont.font, prefixes,
        category, Locale.ALPHABETS.digitTrans, Domains_.digit);
  }
}


/**
 * Makes all rules for a single character.
 * @param store The compound store.
 * @param combiner The combining
 *     function for generating the rule action.
 * @param key The unicode value of the character.
 * @param unicode The actual unicode character.
 * @param letter The letter of the corresponding alphabet or
 *     number.
 * @param font The font name.
 * @param prefixes The prefixes for caps, small, or number.
 * @param category The category name.
 * @param transformers The transformer method
 *      for the particular type of character.
 * @param domains The list of domains in which to create
 *     rules. They correspond to the union of the domains for prefixes and
 *     transformers.
 */
export function makeLetter(combiner: Combiner, key: string, unicode: string,
    letter: string|number, font: string, prefixes: {[key: string]: string},
    category: string, transformers: {[key: string]: Transformer},
    domains: string[]) {
  for (let i = 0, domain; domain = domains[i]; i++) {
    let transformer =
        domain in transformers ? transformers[domain] : transformers['default'];
    let prefix = domain in prefixes ? prefixes[domain] : prefixes['default'];
    MathCompoundStore.defineRule(
        key.toString(), domain, 'default', category, unicode,
        combiner(transformer(letter), font, prefix));
  }
}

export declare type Alphabet = {
  interval: [string, string],
  base: Base,
  subst: {[key: string]: string|boolean},
  category: string,
  font: Font|Embellish,
  capital?: boolean,
  offset?: number
};


/**
 * Alphabet definitions by intervals and exceptions
 */
export const INTERVALS: Alphabet[] = [
  // Latin
  {
    interval: ['1D400', '1D419'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.BOLD
  },
  {
    interval: ['1D41A', '1D433'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.BOLD
  },
  {
    interval: ['1D56C', '1D585'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.BOLDFRAKTUR
  },
  {
    interval: ['1D586', '1D59F'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.BOLDFRAKTUR
  },
  {
    interval: ['1D468', '1D481'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.BOLDITALIC
  },
  {
    interval: ['1D482', '1D49B'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.BOLDITALIC
  },
  {
    interval: ['1D4D0', '1D4E9'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.BOLDSCRIPT
  },
  {
    interval: ['1D4EA', '1D503'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.BOLDSCRIPT
  },
  {
    interval: ['1D538', '1D551'],
    base: Base.LATINCAP,
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
    font: Font.DOUBLESTRUCK
  },
  {
    interval: ['1D552', '1D56B'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.DOUBLESTRUCK
  },
  {
    interval: ['1D504', '1D51D'],
    base: Base.LATINCAP,
    subst: {
      '1D506': '212D',
      '1D50B': '210C',
      '1D50C': '2111',
      '1D515': '211C',
      '1D51D': '2128'
    },
    capital: true,
    category: 'Lu',
    font: Font.FRAKTUR
  },
  {
    interval: ['1D51E', '1D537'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.FRAKTUR
  },
  {
    interval: ['FF21', 'FF3A'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.FULLWIDTH
  },
  {
    interval: ['FF41', 'FF5A'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.FULLWIDTH
  },
  {
    interval: ['1D434', '1D44D'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.ITALIC
  },
  {
    interval: ['1D44E', '1D467'],
    base: Base.LATINSMALL,
    subst: {'1D455': '210E'},
    capital: false,
    category: 'Ll',
    font: Font.ITALIC
  },
  {
    interval: ['1D670', '1D689'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.MONOSPACE
  },
  {
    interval: ['1D68A', '1D6A3'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.MONOSPACE
  },
  {
    interval: ['0041', '005A'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.NORMAL
  },
  {
    interval: ['0061', '007A'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.NORMAL
  },
  {
    interval: ['1D49C', '1D4B5'],
    base: Base.LATINCAP,
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
    font: Font.SCRIPT
  },
  {
    interval: ['1D4B6', '1D4CF'],
    base: Base.LATINSMALL,
    subst: {'1D4BA': '212F', '1D4BC': '210A', '1D4C4': '2134'},
    capital: false,
    category: 'Ll',
    font: Font.SCRIPT
  },
  {
    interval: ['1D5A0', '1D5B9'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.SANSSERIF
  },
  {
    interval: ['1D5BA', '1D5D3'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.SANSSERIF
  },
  {
    interval: ['1D608', '1D621'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.SANSSERIFITALIC
  },
  {
    interval: ['1D622', '1D63B'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.SANSSERIFITALIC
  },
  {
    interval: ['1D5D4', '1D5ED'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.SANSSERIFBOLD
  },
  {
    interval: ['1D5EE', '1D607'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.SANSSERIFBOLD
  },
  {
    interval: ['1D63C', '1D655'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ['1D656', '1D66F'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.SANSSERIFBOLDITALIC
  },
  // Greek
  {
    interval: ['0391', '03A9'],
    base: Base.GREEKCAP,
    subst: {'03A2': '03F4'},
    capital: true,
    category: 'Lu',
    font: Font.NORMAL
  },
  {
    interval: ['03B0', '03D0'],
    base: Base.GREEKSMALL,
    subst: {
      '03B0': '2207',
      '03CA': '2202',
      '03CB': '03F5',
      '03CC': '03D1',
      '03CD': '03F0',
      '03CE': '03D5',
      '03CF': '03F1',
      '03D0': '03D6'
    },
    capital: false,
    category: 'Ll',
    font: Font.NORMAL
  },
  {
    interval: ['1D6A8', '1D6C0'],
    base: Base.GREEKCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.BOLD
  },
  {
    interval: ['1D6C1', '1D6E1'],
    base: Base.GREEKSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.BOLD
  },
  {
    interval: ['1D6E2', '1D6FA'],
    base: Base.GREEKCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.ITALIC
  },
  {
    interval: ['1D6FB', '1D71B'],
    base: Base.GREEKSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.ITALIC
  },
  {
    interval: ['1D71C', '1D734'],
    base: Base.GREEKCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.BOLDITALIC
  },
  {
    interval: ['1D735', '1D755'],
    base: Base.GREEKSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.BOLDITALIC
  },
  {
    interval: ['1D756', '1D76E'],
    base: Base.GREEKCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.SANSSERIFBOLD
  },
  {
    interval: ['1D76F', '1D78F'],
    base: Base.GREEKSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.SANSSERIFBOLD
  },
  {
    interval: ['1D790', '1D7A8'],
    base: Base.GREEKCAP,
    subst: {},
    capital: true,
    category: 'Lu',
    font: Font.SANSSERIFBOLDITALIC
  },
  {
    interval: ['1D7A9', '1D7C9'],
    base: Base.GREEKSMALL,
    subst: {},
    capital: false,
    category: 'Ll',
    font: Font.SANSSERIFBOLDITALIC
  },
  // Digits
  {
    interval: ['0030', '0039'],
    base: Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: Font.NORMAL
  },
  {
    interval: ['2070', '2079'],
    base: Base.DIGIT,
    subst: {2071: '00B9', 2072: '00B2', 2073: '00B3'},
    offset: 0,
    category: 'No',
    font: Embellish.SUPER
  },
  {
    interval: ['2080', '2089'],
    base: Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'No',
    font: Embellish.SUB
  },
  {
    interval: ['245F', '2473'],
    base: Base.DIGIT,
    subst: {'245F': '24EA'},
    offset: 0,
    category: 'No',
    font: Embellish.CIRCLED
  },
  {
    interval: ['3251', '325F'],
    base: Base.DIGIT,
    subst: {},
    offset: 21,
    category: 'No',
    font: Embellish.CIRCLED
  },
  {
    interval: ['32B1', '32BF'],
    base: Base.DIGIT,
    subst: {},
    offset: 36,
    category: 'No',
    font: Embellish.CIRCLED
  },
  {
    interval: ['2474', '2487'],
    base: Base.DIGIT,
    subst: {},
    offset: 1,
    category: 'No',
    font: Embellish.PARENTHESIZED
  },  // (start at 1)
  {
    interval: ['2487', '249B'],
    base: Base.DIGIT,
    subst: {2487: '1F100'},
    offset: 0,
    category: 'No',
    font: Embellish.PERIOD
  },
  {
    interval: ['2775', '277F'],
    base: Base.DIGIT,
    subst: {2775: '24FF'},
    offset: 0,
    category: 'No',
    font: Embellish.NEGATIVECIRCLED
  },
  {
    interval: ['24EB', '24F4'],
    base: Base.DIGIT,
    subst: {},
    offset: 11,
    category: 'No',
    font: Embellish.NEGATIVECIRCLED
  },
  {
    interval: ['24F5', '24FE'],
    base: Base.DIGIT,
    subst: {},
    offset: 1,
    category: 'No',
    font: Embellish.DOUBLECIRCLED
  },
  // (starts at 1)
  {
    interval: ['277F', '2789'],
    base: Base.DIGIT,
    subst: {'277F': '1F10B'},
    offset: 0,
    category: 'No',
    font: Embellish.CIRCLEDSANSSERIF
  },
  // (0 is NEW)
  {
    interval: ['2789', '2793'],
    base: Base.DIGIT,
    subst: {2789: '1F10C'},
    offset: 0,
    category: 'No',
    font: Embellish.NEGATIVECIRCLEDSANSSERIF
  },
  //  (0 is NEW!)
  {
    interval: ['FF10', 'FF19'],
    base: Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: Font.FULLWIDTH
  },
  {
    interval: ['1D7CE', '1D7D7'],
    base: Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: Font.BOLD
  },
  {
    interval: ['1D7D8', '1D7E1'],
    base: Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: Font.DOUBLESTRUCK
  },
  {
    interval: ['1D7E2', '1D7EB'],
    base: Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: Font.SANSSERIF
  },
  {
    interval: ['1D7EC', '1D7F5'],
    base: Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: Font.SANSSERIFBOLD
  },
  {
    interval: ['1D7F6', '1D7FF'],
    base: Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'Nd',
    font: Font.MONOSPACE
  },
  {
    interval: ['1F101', '1F10A'],
    base: Base.DIGIT,
    subst: {},
    offset: 0,
    category: 'No',
    font: Embellish.COMMA
  },
  // Other alphabets
  {
    interval: ['24B6', '24CF'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'So',
    font: Embellish.CIRCLED
  },
  {
    interval: ['24D0', '24E9'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'So',
    font: Embellish.CIRCLED
  },
  {
    interval: ['1F110', '1F129'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'So',
    font: Embellish.PARENTHESIZED
  },
  {
    interval: ['249C', '24B5'],
    base: Base.LATINSMALL,
    subst: {},
    capital: false,
    category: 'So',
    font: Embellish.PARENTHESIZED
  },
  {
    interval: ['1F130', '1F149'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'So',
    font: Embellish.SQUARED
  },
  {
    interval: ['1F170', '1F189'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'So',
    font: Embellish.NEGATIVESQUARED
  },
  {
    interval: ['1F150', '1F169'],
    base: Base.LATINCAP,
    subst: {},
    capital: true,
    category: 'So',
    font: Embellish.NEGATIVECIRCLED
  }
];

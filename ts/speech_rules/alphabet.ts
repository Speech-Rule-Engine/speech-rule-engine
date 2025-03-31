//
// Copyright 2020-22 Volker Sorge
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
 * @file Generator for alphabets.
 */

/**
 * Enumerator for Unicode fonts. These match the font elements in sre.Messages
 */
export enum Font {
  BOLD = 'bold',
  BOLDFRAKTUR = 'bold-fraktur',
  BOLDITALIC = 'bold-italic',
  BOLDSCRIPT = 'bold-script',
  DOUBLESTRUCK = 'double-struck',
  DOUBLESTRUCKITALIC = 'double-struck-italic', // probably not needed.
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
 * elements in the Locale.
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
 * Translate number to string with at least four characters.
 *
 * @param num The number.
 * @returns The resulting string padded with 0 if necessary.
 */
function num2str(num: number): string {
  const str = num.toString(16).toUpperCase();
  return str.length > 3 ? str : ('000' + str).slice(-4);
}

/**
 * Creates a list of unicode character codes from an interval specification.
 *
 * @param int Pair of strings that represent the Unicode value
 *      of the start and end character in the interval.
 * @param int."0" Start of range.
 * @param int."1" End of range.
 * @param subst Substitutions of characters in the
 *      above interval.
 * @returns The generated interval of Unicode character codes.
 */
export function makeInterval(
  [a, b]: [string, string],
  subst: { [key: string]: string | boolean }
): string[] {
  const start = parseInt(a, 16);
  const end = parseInt(b, 16);
  const result = [];
  for (let i = start; i <= end; i++) {
    let key = num2str(i);
    const sub = subst[key];
    // TODO (TS): Check if this can be simplified by removing the boolean case.
    if (sub === false) {
      continue;
    }
    key = (subst[key] as any) || key;
    result.push(key);
  }
  return result;
}

/**
 * Creates an interval of unicode characters.
 *
 * @param int Pair of strings that represent the Unicode value
 *      of the start and end character in the interval.
 * @param int."0" Start of range.
 * @param int."1" End of range.
 * @param subst Substitutions of characters in the
 *      above interval.
 * @returns The generated interval of Unicode characters.
 */
function makeCharInterval(
  int: [string, string],
  subst: { [key: string]: string | boolean } = {}
) {
  return makeInterval(int, subst).map((x) =>
    String.fromCodePoint(parseInt(x, 16))
  );
}

/**
 * Creates a list of unicode characters from a mixed interval specification.
 *
 * @param ints A list of hex code strings or hex code intervals.
 * @returns The list of unicode characters.
 */
export function makeMultiInterval(ints: (string | [string, string])[]) {
  let result: string[] = [];
  for (const int of ints) {
    if (Array.isArray(int)) {
      result = result.concat(makeCharInterval(int));
      continue;
    }
    result.push(String.fromCodePoint(parseInt(int, 16)));
  }
  return result;
}

/**
 * Creates a list of code points from a mixed interval specification.
 *
 * @param ints A list of hex code strings or hex code intervals.
 * @returns The list of numeric codes for the list elements.
 */
export function makeCodeInterval(ints: (string | [string, string])[]) {
  let result: number[] = [];
  for (const int of ints) {
    if (Array.isArray(int)) {
      result = result.concat(makeInterval(int, {}).map((x) => parseInt(x, 16)));
      continue;
    }
    result.push(parseInt(int, 16));
  }
  return result;
}

export declare interface ProtoAlphabet {
  interval: [string, string];
  base: Base;
  subst: { [key: string]: string | boolean };
  category: string;
  font: Font | Embellish;
  capital?: boolean;
  offset?: number;
}

export declare interface Alphabet extends ProtoAlphabet {
  unicode: string[];
}

/**
 * Alphabet definitions by intervals and exceptions
 */
const PROTO_INTERVALS: ProtoAlphabet[] = [
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
    subst: { '1D455': '210E' },
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
    subst: { '1D4BA': '212F', '1D4BC': '210A', '1D4C4': '2134' },
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
    subst: { '03A2': '03F4' },
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
    subst: { 2071: '00B9', 2072: '00B2', 2073: '00B3' },
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
    subst: { '245F': '24EA' },
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
  }, // (start at 1)
  {
    interval: ['2487', '249B'],
    base: Base.DIGIT,
    subst: { 2487: '1F100' },
    offset: 0,
    category: 'No',
    font: Embellish.PERIOD
  },
  {
    interval: ['2775', '277F'],
    base: Base.DIGIT,
    subst: { 2775: '24FF' },
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
    subst: { '277F': '1F10B' },
    offset: 0,
    category: 'No',
    font: Embellish.CIRCLEDSANSSERIF
  },
  // (0 is NEW)
  {
    interval: ['2789', '2793'],
    base: Base.DIGIT,
    subst: { 2789: '1F10C' },
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

export const INTERVALS: Map<string, Alphabet> = new Map();

/**
 * Create name of an alphabet entry.
 *
 * @param base The base name entry.
 * @param font The font of the character.
 * @returns The alphabet entry combining the base name and the font.
 */
export function alphabetName(base: string, font: string) {
  const capFont = font
    .split('-')
    .map((x) => x[0].toUpperCase() + x.slice(1))
    .join('');
  return base + capFont;
}

for (const proto of PROTO_INTERVALS) {
  const key = alphabetName(proto.base, proto.font);
  const interval = makeCharInterval(proto.interval, proto.subst);
  let alphabet = INTERVALS.get(key);
  if (alphabet) {
    alphabet.unicode = alphabet.unicode.concat(interval);
    continue;
  }
  alphabet = proto as Alphabet;
  alphabet.unicode = interval;
  INTERVALS.set(key, alphabet);
}

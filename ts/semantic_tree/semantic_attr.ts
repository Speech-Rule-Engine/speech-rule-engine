//
// Copyright 2013 Google Inc.
// Copyright 2014-21 Volker Sorge
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
 * @file Semantic attributes of Math symbols and expressions.
 *
 * This file contains the basic functionality to lookup and assign semantic
 * attributes for mathematical expressions. Since there is no such thing as a
 * well-defined semantics for all of mathematics we compute a default semantics
 * that closely models mathematical expressions found in K-12 mathematics as
 * well as in general undergraduate curriculum (i.e., calculus, linear algebra,
 * etc).
 *
 * Currently semantic attributes of symbols consist of the following two parts:
 *
 * type -- An unmutable property of an expression, regardless of its position in
 *         the math expression. For example, the letter 'f' will always have the
 *         type identifier, regardless of its use in context, e.g. as function
 *         symbol or variable.
 *
 * role -- A mutable description of the role an expression plays in the context
 *         of the overall mathematical expression. For instance, the symbol '|'
 *         is of type punctuation, but depending on context it has the role of a
 *         neutral fence or of a single vertical bar.
 *
 * In addition for some symbols we record the font as a further attribute.
 *
 * When a semantically interpreted expression is transformed into a XML
 * representation, types become tag names, while role, font, etc. are added as
 * attributes.
 *
 * This file is part of the content script as we do not want to call out to the
 * background page every time we need to look up the semantic of a symbol.
 * @author sorge@google.com (Volker Sorge)
 */

import {
  SemanticMeaning,
  SemanticRole,
  SemanticType,
  SemanticFont,
  SemanticSecondary
} from './semantic_meaning.js';
import * as Alphabet from '../speech_rules/alphabet.js';

export namespace NamedSymbol {
  /**
   * Invisible operator for function application.
   */
  export const functionApplication = String.fromCodePoint(0x2061);

  /**
   * Invisible operator for multiplication.
   */
  export const invisibleTimes: string = String.fromCodePoint(0x2062);

  /**
   * The invisible comma character.
   */
  export const invisibleComma: string = String.fromCodePoint(0x2063);

  /**
   * Invisible operator for plus.
   */
  export const invisiblePlus: string = String.fromCodePoint(0x2064);
}

// Map extensions for semantic maps.

class meaningMap extends Map<string, SemanticMeaning> {
  /**
   * Lookup the semantic meaning of a symbol in terms of type and role. If symbol
   * has no predefined meaning, returns unknown.
   *
   * @param symbol
   */
  public get(symbol: string) {
    return (
      super.get(symbol) || {
        role: SemanticRole.UNKNOWN,
        type: SemanticType.UNKNOWN,
        font: SemanticFont.UNKNOWN
      }
    );
  }
}

/**
 * Secondary annotation facility. This allows to compute a special annotation,
 * if desired.
 */
class secondaryMap extends Map<string, string> {
  /**
   * @override
   *
   * Builds the secondary annotation structure.
   *
   * @param char The character to define a secondary meaning on.
   * @param kind The kind of annotation.
   * @param annotation Optionally an annotation value. Default is `kind`.
   */
  public set(char: string, kind: SemanticSecondary, annotation = '') {
    super.set(this.secKey(kind, char), annotation || kind);
    return this;
  }

  /**
   * @override
   * @param kind The kind of annotation.
   * @param char The character to look up.
   */
  public has(char: string, kind?: SemanticSecondary) {
    return super.has(this.secKey(kind, char));
  }

  /**
   * @override
   * @param kind The kind of annotation.
   * @param char The character to look up.
   */
  public get(char: string, kind?: SemanticSecondary) {
    return super.get(this.secKey(kind, char));
  }

  /**
   * The key generator for secondary annotations.
   *
   * @param kind The kind of annotation.
   * @param char The character to look up.
   * @returns The generated key.
   */
  private secKey(kind: SemanticSecondary, char: string) {
    return char ? `${kind} ${char}` : `${kind}`;
  }
}

export namespace SemanticMap {
  /**
   * Mapping primary meaning of symbols.
   */
  export const Meaning = new meaningMap();

  /**
   * Secondary meaning.
   */
  export const Secondary = new secondaryMap();

  // Fences.
  // Fences are treated slightly differently from other symbols as we want to
  // record pairs of opening/closing and top/bottom fences.
  /**
   * Mapping opening to closing fences.
   */
  export const FencesHoriz = new Map();

  /**
   * Mapping top to bottom fences.
   */
  export const FencesVert = new Map();
}

/**
 *
 * @param symbols
 * @param meaning
 */
function addMeaning(symbols: string[], meaning: MeaningSet) {
  for (const symbol of symbols) {
    SemanticMap.Meaning.set(symbol, {
      role: meaning.role || SemanticRole.UNKNOWN,
      type: meaning.type || SemanticType.UNKNOWN,
      font: meaning.font || SemanticFont.UNKNOWN
    });
    if (meaning.secondary) {
      SemanticMap.Secondary.set(symbol, meaning.secondary);
    }
  }
}

/**
 * Initializes the dictionary mapping symbols to meaning.
 *
 * @returns The dictionary mapping strings to semantic attributes.
 */
function initMeaning() {
  // Punctuation Characters.
  // generalPunctuations
  const sets: MeaningSet[] = [
    {
      set: [
        '23',
        '26',
        '40',
        '5c',
        'a1',
        'a7',
        'b6',
        'bf',
        '2017',
        ['2022', '2025'],
        '2027',
        '203b',
        '203c',
        ['2041', '2043'],
        ['2047', '2049'],
        ['204b', '204d'],
        '2050',
        '2055',
        '2056',
        ['2058', '205e'],
        '2234',
        '2235',
        'fe45',
        'fe46',
        'fe5f',
        'fe60',
        'fe68',
        'fe6b',
        'ff03',
        'ff06',
        'ff0f',
        'ff20',
        'ff3c'
      ],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.UNKNOWN
    },

    // quotes
    {
      set: [
        '22',
        'ab',
        'bb',
        '2dd',
        ['2018', '201f'],
        '2039',
        '203a',
        ['301d', '301f'],
        'fe10',
        'ff02',
        'ff07'
      ],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.QUOTES
    },

    // semicolons
    {
      set: ['3b', '204f', '2a1f', '2a3e', 'fe14', 'fe54', 'ff1b'],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.SEMICOLON
    },

    // questionmarks
    {
      set: ['3f', '203d', 'fe16', 'fe56', 'ff1f'],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.QUESTION
    },

    // exclamationmarks
    {
      set: ['21', 'fe15', 'fe57', 'ff01'],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.EXCLAMATION
    },

    // overaccents
    {
      set: [
        '5e',
        '60',
        'a8',
        'aa',
        'b4',
        'ba',
        '2c7',
        ['2d8', '2da'],
        '2040',
        '207a',
        '207d',
        '207e',
        'ff3e',
        'ff40'
      ],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.OVERACCENT
    },

    // underaccents
    {
      set: ['b8', '2db', '2038', '203f', '2054', '208a', '208d', '208e'],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.UNDERACCENT
    },

    // colons
    {
      set: ['3a', '2982', 'fe13', 'fe30', 'fe55', 'ff1a'],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.COLON
    },

    // commas
    {
      set: ['2c', '2063', 'fe50', 'ff0c'],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.COMMA
    },

    // ellipses
    {
      set: ['2026', ['22ee', '22f1'], 'fe19'],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.ELLIPSIS
    },

    // fullStops
    {
      set: ['2e', 'fe52', 'ff0e'],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.FULLSTOP
    },

    // dashes as operators
    {
      set: [
        '2d',
        '207b',
        '208b',
        '2212',
        '2796',
        'fe63',
        'ff0d'
      ],
      type: SemanticType.OPERATOR,
      role: SemanticRole.DASH,
      secondary: SemanticSecondary.BAR
    },

    // dashes as punctuation
    {
      set: [
        '5f',
        'af',
        ['2010', '2015'],
        '203e',
        '208b',
        ['fe49', 'fe4f'],
        'fe58',
        'ff3f',
        'ffe3'
      ],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.DASH,
      secondary: SemanticSecondary.BAR
    },

    // tildes
    {
      set: [
        '7e',
        '2dc',
        '2f7',
        '303',
        '330',
        '334',
        '2053',
        '223c',
        '223d',
        '301c',
        'ff5e'
      ],
      type: SemanticType.OPERATOR,
      role: SemanticRole.TILDE,
      secondary: SemanticSecondary.TILDE
    },

    // primes
    {
      set: ['27', '2b9', '2ba', ['2032', '2037'], '2057'],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.PRIME
    },

    // degrees
    {
      set: ['b0'],
      type: SemanticType.PUNCTUATION,
      role: SemanticRole.DEGREE
    },

    // Operators.

    // additions
    {
      set: [
        '2b',
        'b1',
        '2064',
        '2213',
        '2214',
        '2228',
        '222a',
        ['228c', '228e'],
        '2294',
        '2295',
        '229d',
        '229e',
        '22bb',
        '22bd',
        '22c4',
        '22ce',
        '22d3',
        '2304',
        '271b',
        '271c',
        '2795',
        '27cf',
        '29fa',
        '29fb',
        '29fe',
        ['2a22', '2a28'],
        '2a2d',
        '2a2e',
        '2a39',
        '2a42',
        '2a45',
        '2a46',
        '2a48',
        '2a4a',
        '2a4c',
        '2a4f',
        '2a50',
        '2a52',
        '2a54',
        '2a56',
        '2a57',
        '2a59',
        '2a5b',
        '2a5d',
        ['2a61', '2a63'],
        '2adc',
        '2add',
        'fe62',
        'ff0b'
      ],
      type: SemanticType.OPERATOR,
      role: SemanticRole.ADDITION
    },

    // multiplications
    // conjugate operators (e.g., Hermitian) '⊹', '†', '‡',
    {
      set: [
        '2a',
        'b7',
        'd7',
        '2020',
        '2021',
        '204e',
        '2051',
        '2062',
        ['2217', '2219'],
        '2227',
        '2229',
        '2240',
        '2293',
        '2297',
        ['2299', '229b'],
        '22a0',
        '22a1',
        '22b9',
        '22bc',
        ['22c5', '22cc'],
        '22cf',
        '22d2',
        '22d4',
        '2303',
        '2305',
        '2306',
        '25cb',
        '2715',
        '2716',
        '27ce',
        '27d1',
        ['29d1', '29d7'],
        '29e2',
        '2a1d',
        ['2a2f', '2a37'],
        ['2a3b', '2a3d'],
        '2a40',
        '2a43',
        '2a44',
        '2a47',
        '2a49',
        '2a4b',
        '2a4d',
        '2a4e',
        '2a51',
        '2a53',
        '2a55',
        '2a58',
        '2a5a',
        '2a5c',
        ['2a5e', '2a60'],
        '2ada',
        '2adb',
        'fe61',
        'ff0a'
      ],
      type: SemanticType.OPERATOR,
      role: SemanticRole.MULTIPLICATION
    },

    // subtractions
    {
      set: [
        '2d',
        'af',
        '2010',
        '2011',
        '2052',
        '207b',
        '208b',
        '2212',
        '2216',
        '2238',
        '2242',
        '2296',
        '229f',
        '2796',
        '29ff',
        ['2a29', '2a2c'],
        '2a3a',
        '2a41',
        'fe63',
        'ff0d'
      ],
      type: SemanticType.OPERATOR,
      role: SemanticRole.SUBTRACTION
    },

    // divisions
    {
      set: [
        '2f',
        'f7',
        '2044',
        '2215',
        '2298',
        '2797',
        '27cc',
        '29bc',
        ['29f5', '29f9'],
        '2a38'
      ],
      type: SemanticType.OPERATOR,
      role: SemanticRole.DIVISION
    },

    // postfix operators
    {
      set: [
        '25',
        '2030',
        '2031',
        'ff05',
        'fe6a'
      ],
      type: SemanticType.OPERATOR,
      role: SemanticRole.POSTFIXOP
    },

    // prefix operators
    {
      set: [
        'ac',
        '2200',
        '2201',
        '2203',
        '2204',
        '2206',
        ['221a', '221c'],
        '2310',
        'ffe2'
      ],
      type: SemanticType.OPERATOR,
      role: SemanticRole.PREFIXOP
    },

    // operatorBits
    // TODO (sorge) What to do if single glyphs of big ops occur on their own.
    //  Maybe distribute them into integral/largeop/roots.
    {
      set: [
        '2320',
        '2321',
        '23aa',
        '23ae',
        '23af',
        '23b2',
        '23b3',
        '23b6',
        '23b7'
      ],
      type: SemanticType.OPERATOR,
      role: SemanticRole.PREFIXOP
    },
    // digammas
    {
      set: ['1d7ca', '1d7cb'],
      type: SemanticType.OPERATOR,
      role: SemanticRole.PREFIXOP,
      font: SemanticFont.BOLD
    },

    // Relations

    // equalities
    {
      set: [
        '3d',
        '7e',
        '207c',
        '208c',
        '221d',
        '2237',
        ['223a', '223f'],
        '2243',
        '2245',
        '2248',
        ['224a', '224e'],
        ['2251', '225f'],
        '2261',
        '2263',
        '229c',
        '22cd',
        '22d5',
        '29e4',
        '29e6',
        '2a66',
        '2a67',
        ['2a6a', '2a6c'],
        ['2a6c', '2a78'],
        'fe66',
        'ff1d'
      ],
      type: SemanticType.RELATION,
      role: SemanticRole.EQUALITY
    },

    // inequalities
    {
      set: [
        '3c',
        '3e',
        '2241',
        '2242',
        '2244',
        '2246',
        '2247',
        '2249',
        '224f',
        '2250',
        '2260',
        '2262',
        ['2264', '2281'],
        '22b0',
        '22b1',
        ['22d6', '22e1'],
        ['22e6', '22e9'],
        ['2976', '2978'],
        '29c0',
        '29c1',
        '29e1',
        '29e3',
        '29e5',
        ['2a79', '2abc'],
        ['2af7', '2afa'],
        'fe64',
        'fe65',
        'ff1c',
        'ff1e'
      ],
      type: SemanticType.RELATION,
      role: SemanticRole.INEQUALITY
    },

    // setRelations
    {
      set: [
        ['2282', '228b'],
        ['228f', '2292'],
        ['22b2', '22b8'],
        '22d0',
        '22d1',
        ['22e2', '22e5'],
        ['22ea', '22ed'],
        '27c3',
        '27c4',
        ['27c7', '27c9'],
        ['27d5', '27d7'],
        '27dc',
        ['2979', '297b'],
        '29df',
        ['2abd', '2ad8']
      ],
      type: SemanticType.RELATION,
      role: SemanticRole.SET
    },

    // relations
    {
      set: [
        '2236',
        ['27e0', '27e5'],
        '292b',
        '292c',
        ['29b5', '29bb'],
        '29be',
        '29bf',
        ['29c2', '29d0']
      ],
      type: SemanticType.RELATION,
      role: SemanticRole.UNKNOWN
    },

    // setEmpty
    {
      set: ['2205', ['29b0', '29b4']],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.SETEMPTY
    },

    // infty
    {
      set: ['1ab2', '221e', ['29dc', '29de']],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.INFTY
    },

    // logicRelations
    // TODO (sorge): Add all the other relations? Currently mainly tacks and
    // turnstyles.
    {
      set: [
        '22a2',
        '22a3',
        ['22a6', '22af'],
        '27da',
        '27db',
        '27dd',
        '27de',
        '2ade',
        ['2ae2', '2ae6'],
        '2aec',
        '2aed'
      ],
      type: SemanticType.RELATION,
      role: SemanticRole.LOGIC
    },

    // logicIdentifier
    {
      set: [
        '22a4',
        '22a5',
        '22ba',
        '27d8',
        '27d9',
        '27df',
        '2adf',
        '2ae0',
        ['2ae7', '2aeb'],
        '2af1'
      ],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.LOGIC
    },

    // arrows
    {
      set: [
        ['2190', '21ff'],
        '2301',
        '2324',
        '238b',
        '2794',
        ['2798', '27af'],
        ['27b1', '27be'],
        ['27f0', '27ff'],
        ['2900', '292a'],
        ['292d', '2975'],
        ['297c', '297f'],
        ['2b00', '2b11'],
        ['2b30', '2b4c'],
        ['ffe9', 'ffec']
      ],
      type: SemanticType.RELATION,
      role: SemanticRole.ARROW
    },

    // Membership. Currently treated as operator.

    // elementRelations
    {
      set: ['2208', '220a', ['22f2', '22f9'], '22ff', '27d2', '2ad9'],
      type: SemanticType.OPERATOR,
      role: SemanticRole.ELEMENT
    },

    // nonelementRelations
    {
      set: ['2209'],
      type: SemanticType.OPERATOR,
      role: SemanticRole.NONELEMENT
    },

    // reelementRelations
    {
      set: ['220b', '220d', ['22fa', '22fe']],
      type: SemanticType.OPERATOR,
      role: SemanticRole.REELEMENT
    },

    // renonelementRelations
    {
      set: ['220c'],
      type: SemanticType.OPERATOR,
      role: SemanticRole.RENONELEMENT
    },

    // Large operation symbols
    // sumOps
    {
      set: [
        ['220f', '2211'],
        ['22c0', '22c3'],
        ['2a00', '2a0b'],
        '2a3f',
        '2afc',
        '2aff'
      ],
      type: SemanticType.LARGEOP,
      role: SemanticRole.SUM
    },
    // double struck
    {
      set: ['2140'],
      type: SemanticType.LARGEOP,
      role: SemanticRole.SUM,
      font: SemanticFont.DOUBLESTRUCK
    },
    // intOps
    {
      set: [
        ['222b', '2233'],
        ['2a0c', '2a17'],
        ['2a17', '2a1c']
      ],
      type: SemanticType.LARGEOP,
      role: SemanticRole.INTEGRAL
    },

    // Geometric symbols
    {
      set: [['2500', '257F']],
      type: SemanticType.RELATION,
      role: SemanticRole.BOX
    },
    {
      set: [['2580', '259F']],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.BLOCK
    },
    {
      set: [
        ['25A0', '25FF'],
        ['2B12', '2B2F'],
        ['2B50', '2B59']
      ],
      type: SemanticType.RELATION,
      role: SemanticRole.GEOMETRY
    },

    // geometryOps
    {
      set: [
        '220e',
        '2300',
        '2302',
        '2311',
        '29bd',
        '29e0',
        ['29e8', '29f3'],
        '2a1e',
        '2afe',
        'ffed',
        'ffee'
      ],
      type: SemanticType.OPERATOR,
      role: SemanticRole.GEOMETRY
    },

    // angles
    {
      set: [
        ['221f', '2222'],
        '22be',
        '22bf',
        ['2312', '2314'],
        '237c',
        '27c0',
        ['299b', '29af']
      ],
      type: SemanticType.OPERATOR,
      role: SemanticRole.GEOMETRY
    },

    // Units
    //
    // (Can't give role unit as otherwise string notation like $a4f would not
    // work)

    // units
    {
      set: [
        '24',
        ['a2', 'a5'],
        'b5',
        '2123',
        ['2125', '2127'],
        '212a',
        '212b',
        'fe69',
        'ff04',
        'ffe0',
        'ffe1',
        'ffe5',
        'ffe6'
      ],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.UNKNOWN
    },

    // Extra letter symbols (other letters)

    // arbitraryChars
    {
      set: [
        'a9',
        'ae',
        '210f',
        '2114',
        '2116',
        '2117',
        ['211e', '2122'],
        '212e',
        '2132',
        ['2139', '213b'],
        ['2141', '2144'],
        '214d',
        '214e',
        ['1f12a', '1f12c'],
        '1f18a'
      ],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.OTHERLETTER
    },

    // Remaining Symbols

    // operators
    {
      set: [
        '2224',
        '2226',
        '2239',
        '2307',
        '27b0',
        '27bf',
        '27c1',
        '27c2',
        '27ca',
        '27cb',
        '27cd',
        '27d0',
        '27d3',
        '27d4',
        '2981',
        '2999',
        '299a',
        '29e7',
        '29f4',
        '2a20',
        '2a21',
        '2a64',
        '2a65',
        '2a68',
        '2a69',
        '2ae1',
        ['2aee', '2af0'],
        '2af2',
        '2af3',
        '2af5',
        '2af6',
        '2afb',
        '2afd'
      ],
      type: SemanticType.OPERATOR,
      role: SemanticRole.UNKNOWN
    },

    {
      set: ['2605', '2606', '26aa', '26ab', ['2720', '274d']],
      type: SemanticType.OPERATOR,
      role: SemanticRole.UNKNOWN
    },

    // Characters other than alphabets
    // Latin rest characters
    {
      set: [['2145', '2149']],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.LATINLETTER,
      font: SemanticFont.DOUBLESTRUCKITALIC,
      secondary: SemanticSecondary.ALLLETTERS
    },
    // Greek rest characters.
    {
      set: [['213c', '213f']],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.GREEKLETTER,
      font: SemanticFont.DOUBLESTRUCK,
      secondary: SemanticSecondary.ALLLETTERS
    },
    {
      set: [
        '3d0',
        '3d7',
        '3f6',
        ['1d26', '1d2a'],
        '1d5e',
        '1d60',
        ['1d66', '1d6a']
      ],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.GREEKLETTER,
      font: SemanticFont.NORMAL,
      secondary: SemanticSecondary.ALLLETTERS
    },
    // Other alphabets.
    {
      set: [['2135', '2138']],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.OTHERLETTER,
      font: SemanticFont.NORMAL,
      secondary: SemanticSecondary.ALLLETTERS
    },
    // Remaining Latin Characters
    // TODO: Move these elsewhere.
    // dotless i and j.
    {
      set: ['131', '237'],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.LATINLETTER,
      font: SemanticFont.NORMAL
    },
    // dotless i and j.
    {
      set: ['1d6a4', '1d6a5'],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.LATINLETTER,
      font: SemanticFont.ITALIC
    },
    // script small l
    // Powerset Cap P.
    {
      set: ['2113', '2118'],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.LATINLETTER,
      font: SemanticFont.SCRIPT
    },
    {
      set: [
        // Extended Latin with accents
        ['c0', 'd6'],
        ['d8', 'f6'],
        ['f8', '1bf'],
        ['1c4', '2af'],
        // Latin phonetic alphabets
        ['1d00', '1d25'],
        ['1d6b', '1d9a'],
        ['1e00', '1ef9'],
        // Latin combining superscripts
        ['363', '36f'],
        ['1dd3', '1de6'],
        // Latin combining subscripts
        ['1d62', '1d65'],
        '1dca',
        // Latin superscripts
        '2071',
        '207f',
        // Latin subscripts
        ['2090', '209c'],
        '2c7c'
      ],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.LATINLETTER,
      font: SemanticFont.NORMAL
    },
    // Numbers.
    {
      set: [['00bc', '00be'], ['2150', '215f'], '2189'],
      type: SemanticType.NUMBER,
      role: SemanticRole.FLOAT
    },
    {
      set: ['23E8', ['3248', '324f']],
      type: SemanticType.NUMBER,
      role: SemanticRole.INTEGER
    },

    // TODO: Checkmarks. Might need their own role.
    {
      set: [['214A', '214C'], '2705', '2713', '2714', '2717', '2718'],
      type: SemanticType.IDENTIFIER,
      role: SemanticRole.UNKNOWN
    },
    // Spaces
    {
      set: [
        '20',
        'a0',
        'ad',
        ['2000', '200f'],
        ['2028', '202f'],
        ['205f', '2060'],
        '206a',
        '206b',
        '206e',
        '206f',
        'feff',
        ['fff9', 'fffb']
      ],
      type: SemanticType.TEXT,
      role: SemanticRole.SPACE
    },
    // Fences
    // neutralFences
    {
      set: [
        '7c',
        'a6',
        '2223',
        '23b8',
        '23b9',
        '23d0',
        '2758',
        ['fe31', 'fe34'],
        'ff5c',
        'ffe4',
        'ffe8'
      ],
      type: SemanticType.FENCE,
      role: SemanticRole.NEUTRAL
    },
    // metricFences
    {
      set: ['2016', '2225', '2980', '2af4'],
      type: SemanticType.FENCE,
      role: SemanticRole.METRIC
    }
  ];
  sets.forEach(({ set: s, ...m }) =>
    addMeaning(Alphabet.makeMultiInterval(s), m)
  );
}

// Fences
/**
 *
 * @param map
 * @param ints
 * @param sep
 */
function addFences(
  map: Map<string, string>,
  ints: (string | [string, string])[],
  sep = 1
) {
  const used: { [key: number]: boolean } = {};
  const codes = Alphabet.makeCodeInterval(ints);
  for (const code of codes) {
    if (used[code]) continue;
    map.set(String.fromCodePoint(code), String.fromCodePoint(code + sep));
    used[code] = true;
    used[code + sep] = true;
  }
}

/**
 *
 */
function initFences() {
  // The intervals are manually minimised.
  addFences(SemanticMap.FencesVert, [
    '23b4',
    ['23dc', '23e1'],
    ['fe35', 'fe44'],
    'fe47'
  ]);
  addFences(SemanticMap.FencesHoriz, [
    '28',
    '2045',
    ['2308', '230f'],
    ['231c', '231f'],
    '2329',
    '23b0',
    ['2768', '2775'],
    '27c5',
    ['27e6', '27ef'],
    ['2983', '2998'],
    ['29d8', '29db'],
    '29fc',
    ['2e22', '2e29'],
    ['3008', '3011'],
    ['3014', '301b'],
    'fd3e',
    'fe17',
    ['fe59', 'fe5e'],
    'ff08',
    'ff5f',
    'ff62'
  ]);
  addFences(SemanticMap.FencesHoriz, ['5b', '7b', 'ff3b', 'ff5b'], 2);
  addFences(SemanticMap.FencesHoriz, [['239b', '23a6']], 3);
  addFences(SemanticMap.FencesHoriz, [['23a7', '23a9']], 4);

  // leftFences
  addMeaning([...SemanticMap.FencesHoriz.keys()], {
    type: SemanticType.FENCE,
    role: SemanticRole.OPEN
  });

  // rightFences
  addMeaning([...SemanticMap.FencesHoriz.values()], {
    type: SemanticType.FENCE,
    role: SemanticRole.CLOSE
  });

  // topFences
  addMeaning([...SemanticMap.FencesVert.keys()], {
    type: SemanticType.FENCE,
    role: SemanticRole.TOP
  });

  // bottomFences
  addMeaning([...SemanticMap.FencesVert.values()], {
    type: SemanticType.FENCE,
    role: SemanticRole.BOTTOM
  });
}

// Functions.
const trigonometricFunctions: string[] = [
  'cos',
  'cot',
  'csc',
  'sec',
  'sin',
  'tan',
  'arccos',
  'arccot',
  'arccsc',
  'arcsec',
  'arcsin',
  'arctan'
];
const hyperbolicFunctions: string[] = [
  'cosh',
  'coth',
  'csch',
  'sech',
  'sinh',
  'tanh',
  'arcosh',
  'arcoth',
  'arcsch',
  'arsech',
  'arsinh',
  'artanh'
];
const algebraicFunctions: string[] = ['deg', 'det', 'dim', 'hom', 'ker', 'Tr'];
const elementaryFunctions: string[] = [
  'log',
  'ln',
  'lg',
  'exp',
  'gcd',
  'lcm',
  'arg',
  'im',
  're',
  'Pr'
];
/**
 * All predefined prefix functions.
 */
const prefixFunctions: string[] = trigonometricFunctions.concat(
  hyperbolicFunctions,
  algebraicFunctions,
  elementaryFunctions
);

/**
 *
 */
function initFunctions() {
  // Functions

  // limitFunctions
  addMeaning(
    [
      'inf',
      'lim',
      'liminf',
      'limsup',
      'max',
      'min',
      'sup',
      'injlim',
      'projlim'
    ],
    {
      type: SemanticType.FUNCTION,
      role: SemanticRole.LIMFUNC
    }
  );

  // prefixFunctions
  // TODO: Do this cleaner
  addMeaning(prefixFunctions, {
    type: SemanticType.FUNCTION,
    role: SemanticRole.PREFIXFUNC
  });

  // infixFunctions
  addMeaning(['mod', 'rem'], {
    type: SemanticType.OPERATOR,
    role: SemanticRole.PREFIXFUNC
  });
}

/**
 * Adds semantic for alternative function names.
 *
 * @param base The base function.
 * @param names The alt names of the function.
 */
export function addFunctionSemantic(base: string, names: string[]) {
  const meaning = SemanticMap.Meaning.get(base) || {
    type: SemanticType.FUNCTION,
    role: SemanticRole.PREFIXFUNC
  };
  addMeaning(names, meaning);
}

/**
 * Default assignments of semantic attributes.
 * Assigns sets of symbols to meaning.
 */
interface MeaningSet {
  set?: (string | [string, string])[];
  role: SemanticRole;
  type: SemanticType;
  font?: SemanticFont;
  secondary?: SemanticSecondary;
}

/**
 * Equality on meaning objects.
 *
 * @param meaning1 First meaning.
 * @param meaning2 Second meaning.
 * @returns True if both contain the same field entries.
 */
export function equal(
  meaning1: SemanticMeaning,
  meaning2: SemanticMeaning
): boolean {
  return (
    meaning1.type === meaning2.type &&
    meaning1.role === meaning2.role &&
    meaning1.font === meaning2.font
  );
}

/**
 * Decide when opening and closing fences match. For neutral fences they have
 * to be the same.
 *
 * @param open Opening fence.
 * @param close Closing fence.
 * @returns True if the fences are matching.
 */
export function isMatchingFence(open: string, close: string): boolean {
  const meaning = SemanticMap.Meaning.get(open);
  if (meaning.type !== SemanticType.FENCE) {
    return false;
  }
  if (
    meaning.role === SemanticRole.NEUTRAL ||
    meaning.role === SemanticRole.METRIC
  ) {
    return open === close;
  }
  return (
    SemanticMap.FencesHoriz.get(open) === close ||
    SemanticMap.FencesVert.get(open) === close
  );
}

/**
 * ORDERING:
 * Create alphabets/numerals
 * Add other semantics for single letters: position, meaning
 * Add to regexp (e.g. all letters)
 * Add secondary meaning: secondary string, position
 */

/**
 *
 * @param alphabet
 */
function changeSemantics(
  alphabet: string[],
  change: { [position: number]: SemanticMeaning }
) {
  for (const [pos, meaning] of Object.entries(change)) {
    const character = alphabet[pos as unknown as number];
    if (character !== undefined) {
      SemanticMap.Meaning.set(character, meaning);
    }
  }
}

/**
 *
 * @param alphabet
 */
function addSecondaries(
  alphabet: string[],
  change: { [position: number]: SemanticSecondary }
) {
  for (const [pos, meaning] of Object.entries(change)) {
    const character = alphabet[pos as unknown as number];
    if (character !== undefined) {
      SemanticMap.Secondary.set(character, meaning);
    }
  }
}

/**
 *
 * @param alphabet
 * @param type
 * @param role
 * @param font
 * @param semfont
 * @param secondaries
 */
function singleAlphabet(
  alphabet: Alphabet.Base,
  type: SemanticType,
  role: SemanticRole,
  font: SemanticFont,
  semfont: SemanticFont,
  secondaries: SemanticSecondary[] = [],
  change: { [position: number]: SemanticMeaning } = {},
  secondary: { [position: number]: SemanticSecondary } = {}
) {
  const interval = Alphabet.INTERVALS.get(Alphabet.alphabetName(alphabet, font));
  if (interval) {
    interval.unicode.forEach((x) => {
      SemanticMap.Meaning.set(x, {
        type: type,
        role: role,
        font: semfont
      });
      secondaries.forEach((sec) => SemanticMap.Secondary.set(x, sec));
    });
    changeSemantics(interval.unicode, change);
    addSecondaries(interval.unicode, secondary);
  }
}

/**
 *
 */
function alphabets() {
  for (const [name, font] of Object.entries(SemanticFont)) {
    const emb = !!(Alphabet as any).Embellish[name];
    const semfont = emb
      ? SemanticFont.UNKNOWN
      : font === SemanticFont.FULLWIDTH
      ? SemanticFont.NORMAL
      : font;
    singleAlphabet(
      Alphabet.Base.LATINCAP,
      SemanticType.IDENTIFIER,
      SemanticRole.LATINLETTER,
      font,
      semfont,
      [SemanticSecondary.ALLLETTERS]
    );
    singleAlphabet(
      Alphabet.Base.LATINSMALL,
      SemanticType.IDENTIFIER,
      SemanticRole.LATINLETTER,
      font,
      semfont,
      [SemanticSecondary.ALLLETTERS],
      {},
      { 3: SemanticSecondary.D }
    );
    singleAlphabet(
      Alphabet.Base.GREEKCAP,
      SemanticType.IDENTIFIER,
      SemanticRole.GREEKLETTER,
      font,
      semfont,
      [SemanticSecondary.ALLLETTERS]
    );
    singleAlphabet(
      Alphabet.Base.GREEKSMALL,
      SemanticType.IDENTIFIER,
      SemanticRole.GREEKLETTER,
      font,
      semfont,
      [SemanticSecondary.ALLLETTERS],
      {
        0: {
          type: SemanticType.OPERATOR,
          role: SemanticRole.PREFIXOP,
          font: semfont
        },
        26: {
          type: SemanticType.OPERATOR,
          role: SemanticRole.PREFIXOP,
          font: semfont
        }
      }
    );
    singleAlphabet(
      Alphabet.Base.DIGIT,
      SemanticType.NUMBER,
      SemanticRole.INTEGER,
      font,
      semfont
    );
  }
}

initMeaning();
initFences();
alphabets();
initFunctions();

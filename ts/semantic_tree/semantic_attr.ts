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
 * @fileoverview Semantic attributes of Math symbols and expressions.
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
 *
 * @author sorge@google.com (Volker Sorge)
 */


import * as SemanticUtil from './semantic_util';


export interface SemanticMeaning {
  type: SemanticAttr.Type;
  role: SemanticAttr.Role;
  font: SemanticAttr.Font;
}


/**
 * Contains the basic mappings of characters/symbols and functions to semantic
 * attributes.
 *
 * Observe that all characters are given as hex code number in order to ease the
 * comparison with those in the JSON files that define speech rules per
 * character.
 */
export namespace SemanticAttr {
  /**
   * Mapping for types of elements.
   */
  export const enum Type {
    // Leafs.
    // Punctuation like comma, dot, ellipses.
    PUNCTUATION = 'punctuation',
    // Fence symbol.
    FENCE = 'fence',
    // One or several digits, plus some punctuation.
    NUMBER = 'number',
    // Single or multiple letters.
    IDENTIFIER = 'identifier',
    // Regular text in a math expression.
    TEXT = 'text',
    // e.g. +, *.
    OPERATOR = 'operator',
    // Relation symbol, e.g. equals.
    RELATION = 'relation',
    // e.g. Sum, product, integral.
    LARGEOP = 'largeop',
    // Some named function.

    FUNCTION = 'function',
    // Branches.
    // Compound Symbols.
    ACCENT = 'accent',
    FENCED = 'fenced',
    FRACTION = 'fraction',

    PUNCTUATED = 'punctuated',
    // Relations.
    // Relation sequence of a single relation.
    RELSEQ = 'relseq',
    // Relation sequence containing at least two different relations.
    MULTIREL = 'multirel',
    // Operations.
    INFIXOP = 'infixop',
    PREFIXOP = 'prefixop',

    POSTFIXOP = 'postfixop',
    // Function and Bigop Application.
    APPL = 'appl',
    INTEGRAL = 'integral',

    BIGOP = 'bigop',
    SQRT = 'sqrt',
    ROOT = 'root',
    // These are bigops or functions with limits.
    LIMUPPER = 'limupper',
    LIMLOWER = 'limlower',
    LIMBOTH = 'limboth',
    SUBSCRIPT = 'subscript',
    SUPERSCRIPT = 'superscript',
    UNDERSCORE = 'underscore',
    OVERSCORE = 'overscore',

    TENSOR = 'tensor',
    // Tables and their elements.
    TABLE = 'table',
    MULTILINE = 'multiline',
    MATRIX = 'matrix',
    VECTOR = 'vector',
    CASES = 'cases',
    ROW = 'row',
    // Lines are effectively single cell rows.
    LINE = 'line',

    CELL = 'cell',
    // Enclosed (counterpart for menclosed).

    ENCLOSE = 'enclose',
    // Proofs and Inferences
    INFERENCE = 'inference',
    RULELABEL = 'rulelabel',
    CONCLUSION = 'conclusion',

    PREMISES = 'premises',
    // General.
    UNKNOWN = 'unknown',
    EMPTY = 'empty'
  }

  /**
   * Mapping for roles of nodes.
   * Roles are more specific than types.
   * @final
   */
  export const enum Role {
    // Punctuation.
    COMMA = 'comma',
    ELLIPSIS = 'ellipsis',
    FULLSTOP = 'fullstop',
    DASH = 'dash',
    PRIME = 'prime',    // Superscript.
    DEGREE = 'degree',  // Superscript.
    VBAR = 'vbar',      // A vertical bar.
    COLON = 'colon',    // A vertical bar.
    OPENFENCE = 'openfence',
    CLOSEFENCE = 'closefence',
    APPLICATION = 'application',  // Function Application.
    DUMMY = 'dummy',              // A dummy separator for text.

    // Identifier that describes a unit.

    UNIT = 'unit',
    // Expression that is used as a label.

    LABEL = 'label',
    // Fences.
    OPEN = 'open',
    CLOSE = 'close',
    TOP = 'top',
    BOTTOM = 'bottom',

    NEUTRAL = 'neutral',
    // Letters.
    LATINLETTER = 'latinletter',
    GREEKLETTER = 'greekletter',
    OTHERLETTER = 'otherletter',

    NUMBERSET = 'numbersetletter',
    // Numbers.
    INTEGER = 'integer',
    FLOAT = 'float',
    OTHERNUMBER = 'othernumber',

    MIXED = 'mixed',
    // Accents.
    MULTIACCENT = 'multiaccent',
    OVERACCENT = 'overaccent',

    UNDERACCENT = 'underaccent',
    // Index and tensor roles.
    UNDEROVER = 'underover',
    SUBSUP = 'subsup',
    LEFTSUB = 'leftsub',
    LEFTSUPER = 'leftsuper',
    RIGHTSUB = 'rightsub',

    RIGHTSUPER = 'rightsuper',
    // Fenced.
    LEFTRIGHT = 'leftright',

    ABOVEBELOW = 'abovebelow',
    // Sets.
    SETEMPTY = 'set empty',
    SETEXT = 'set extended',
    SETSINGLE = 'set singleton',

    SETCOLLECT = 'set collection',
    // Text.
    STRING = 'string',

    SPACE = 'space',
    // Punctuated elements.
    SEQUENCE = 'sequence',
    ENDPUNCT = 'endpunct',
    STARTPUNCT = 'startpunct',

    TEXT = 'text',
    // Operators.
    NEGATIVE = 'negative',
    POSITIVE = 'positive',
    NEGATION = 'negation',
    MULTIOP = 'multiop',
    PREFIXOP = 'prefix operator',

    POSTFIXOP = 'postfix operator',
    // Functions.
    LIMFUNC = 'limit function',
    INFIXFUNC = 'infix function',
    PREFIXFUNC = 'prefix function',
    POSTFIXFUNC = 'postfix function',
    SIMPLEFUNC = 'simple function',

    COMPFUNC = 'composed function',
    // Large operators.
    SUM = 'sum',
    INTEGRAL = 'integral',

    GEOMETRY = 'geometry',
    // Binary operations.
    ADDITION = 'addition',
    MULTIPLICATION = 'multiplication',
    SUBTRACTION = 'subtraction',

    IMPLICIT = 'implicit',
    // Fractions.
    DIVISION = 'division',

    VULGAR = 'vulgar',
    // Relations.
    EQUALITY = 'equality',
    INEQUALITY = 'inequality',
    ELEMENT = 'element',
    ARROW = 'arrow',

    SET = 'set',
    // Roles of matrices or vectors.
    DETERMINANT = 'determinant',
    ROWVECTOR = 'rowvector',
    BINOMIAL = 'binomial',
    SQUAREMATRIX = 'squarematrix',

    CYCLE = 'cycle',
    // Roles of rows, lines, cells.
    // They mirror the different types for tables, unless a more specific role
    // is
    // known.
    MULTILINE = 'multiline',
    MATRIX = 'matrix',
    VECTOR = 'vector',
    CASES = 'cases',

    TABLE = 'table',
    // Inference Roles
    PROOF = 'proof',
    LEFT = 'left',
    RIGHT = 'right',
    UP = 'up',
    DOWN = 'down',
    // conclusion types
    FINAL = 'final',
    // premise types
    SINGLE = 'single',
    HYP = 'hyp',

    AXIOM = 'axiom',
    // General
    UNKNOWN = 'unknown'
  }

  /**
   * Mapping for font annotations. (Taken from MathML2 section 3.2.2, with the
   * exception of double-struck-italic.)
   */
  export const enum Font {
    BOLD = 'bold',
    BOLDFRAKTUR = 'bold-fraktur',
    BOLDITALIC = 'bold-italic',
    BOLDSCRIPT = 'bold-script',
    CALIGRAPHIC = 'caligraphic',
    CALIGRAPHICBOLD = 'caligraphic-bold',
    DOUBLESTRUCK = 'double-struck',
    DOUBLESTRUCKITALIC = 'double-struck-italic',
    FRAKTUR = 'fraktur',
    ITALIC = 'italic',
    MONOSPACE = 'monospace',
    NORMAL = 'normal',
    OLDSTYLE = 'oldstyle',
    OLDSTYLEBOLD = 'oldstyle-bold',
    SCRIPT = 'script',
    SANSSERIF = 'sans-serif',
    SANSSERIFITALIC = 'sans-serif-italic',
    SANSSERIFBOLD = 'sans-serif-bold',
    SANSSERIFBOLDITALIC = 'sans-serif-bold-italic',
    UNKNOWN = 'unknown'
  }

  // Punctuation Characters.
  const generalPunctuations: string[] = [
    '!',  '"',  '#',  '%',  '&',  ';',  '?',  '@',  '\\', '¡',  '§',  '¶',
    '¿',  '‗',  '†',  '‡',  '•',  '‣',  '․',  '‥',  '‧',  '‰',  '‱',  '‸',
    '※',  '‼',  '‽',  '‾',  '⁁',  '⁂',  '⁃',  '⁇',  '⁈',  '⁉',  '⁋',  '⁌',
    '⁍',  '⁎',  '⁏',  '⁐',  '⁑',  '⁓',  '⁕',  '⁖',  '⁘',  '⁙',  '⁚',  '⁛',
    '⁜',  '⁝',  '⁞',  '︐', '︔', '︕', '︖', '︰', '﹅', '﹆', '﹉', '﹊',
    '﹋', '﹌', '﹔', '﹖', '﹗', '﹟', '﹠', '﹡', '﹨', '﹪', '﹫', '！',
    '＂', '＃', '％', '＆', '＇', '＊', '／', '；', '？', '＠', '＼'
  ];
  const colons: string[] = ['︓', ':', '：', '﹕'];
  const invisibleComma_: string = SemanticUtil.numberToUnicode(0x2063);
  const commas: string[] = ['，', '﹐', ',', this.invisibleComma_];
  const ellipses: string[] = ['…', '⋮', '⋯', '⋰', '⋱', '︙'];
  const fullStops: string[] = ['.', '﹒', '．'];
  const dashes: string[] = ['‒', '–', '—', '―', '〜', '︱', '︲', '﹘'];
  const primes: string[] = ['\'', '′', '″', '‴', '‵', '‶', '‷', '⁗', 'ʹ', 'ʺ'];
  const degrees: string[] = ['°'];

  // Fences.
  // Fences are treated slightly differently from other symbols as we want to
  // record pairs of opening/closing and top/bottom fences.
  /**
   * Mapping opening to closing fences.
   */
  const openClosePairs: {[key: string]: string} = {
    // Unicode categories Ps and Pe.
    // Observe that left quotation 301D could also be matched to 301F,
    // but is currently matched to 301E.
    '(': ')',
    '[': ']',
    '{': '}',
    '\u2045': '⁆',
    '\u2329': '〉',
    '\u2768': '❩',
    '\u276a': '❫',
    '\u276c': '❭',
    '\u276e': '❯',
    '\u2770': '❱',
    '\u2772': '❳',
    '\u2774': '❵',
    '\u27c5': '⟆',
    '\u27e6': '⟧',
    '\u27e8': '⟩',
    '\u27ea': '⟫',
    '\u27ec': '⟭',
    '\u27ee': '⟯',
    '\u2983': '⦄',
    '\u2985': '⦆',
    '\u2987': '⦈',
    '\u2989': '⦊',
    '\u298b': '⦌',
    '\u298d': '⦎',
    '\u298f': '⦐',
    '\u2991': '⦒',
    '\u2993': '⦔',
    '\u2995': '⦖',
    '\u2997': '⦘',
    '\u29d8': '⧙',
    '\u29da': '⧛',
    '\u29fc': '⧽',
    '\u2e22': '⸣',
    '\u2e24': '⸥',
    '\u2e26': '⸧',
    '\u2e28': '⸩',
    '\u3008': '〉',
    '\u300a': '》',
    '\u300c': '」',
    '\u300e': '』',
    '\u3010': '】',
    '\u3014': '〕',
    '\u3016': '〗',
    '\u3018': '〙',
    '\u301a': '〛',
    '\u301d': '〞',
    '\ufd3e': '﴿',
    '\ufe17': '︘',
    '\ufe59': '﹚',
    '\ufe5b': '﹜',
    '\ufe5d': '﹞',
    '\uff08': '）',
    '\uff3b': '］',
    '\uff5b': '｝',
    '\uff5f': '｠',
    '\uff62': '｣',
    // Unicode categories Sm and So.
    '\u2308': '⌉',
    '\u230a': '⌋',
    '\u230c': '⌍',
    '\u230e': '⌏',
    '\u231c': '⌝',
    '\u231e': '⌟',
    // Extender fences.
    // Parenthesis.
    '\u239b': '⎞',
    '\u239c': '⎟',
    '\u239d': '⎠',
    // Square bracket.
    '\u23a1': '⎤',
    '\u23a2': '⎥',
    '\u23a3': '⎦',
    // Curly bracket.
    '\u23a7': '⎫',
    '\u23a8': '⎬',
    '\u23a9': '⎭',
    '\u23b0': '⎱',
    '\u23b8': '⎹'
  };

  /**
   * Mapping top to bottom fences.
   */
  const topBottomPairs: {[key: string]: string} = {
    '\u23b4': '⎵',
    '\u23dc': '⏝',
    '\u23de': '⏟',
    '\u23e0': '⏡',
    '\ufe35': '︶',
    '\ufe37': '︸',
    '\ufe39': '︺',
    '\ufe3b': '︼',
    '\ufe3d': '︾',
    '\ufe3f': '﹀',
    '\ufe41': '﹂',
    '\ufe43': '﹄',
    '\ufe47': '﹈'
  };

  const leftFences: string[] = SemanticUtil.objectsToKeys(this.openClosePairs);
  const rightFences: string[] = SemanticUtil.objectsToValues(this.openClosePairs);
  rightFences.push('〟');
  const topFences: string[] = SemanticUtil.objectsToKeys(this.topBottomPairs);
  const bottomFences: string[] = SemanticUtil.objectsToValues(this.topBottomPairs);

  const neutralFences: string[] =
      ['|', '¦', '‖', '∣', '⏐', '⎸', '⎹', '∥', '❘', '⦀', '⫴', '｜', '￤'];
  /**
   * Array of all fences.
   */
  const allFences: string[] = neutralFences.concat(
    leftFences, rightFences, topFences, bottomFences);

  // Identifiers.
  // Latin Alphabets.
  const capitalLatin: string[] = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
  ];
  const smallLatin: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    // dotless i and j.
    'ı', 'ȷ'
  ];
  const capitalLatinFullWidth: string[] = [
    'Ａ', 'Ｂ', 'Ｃ', 'Ｄ', 'Ｅ', 'Ｆ', 'Ｇ', 'Ｈ', 'Ｉ',
    'Ｊ', 'Ｋ', 'Ｌ', 'Ｍ', 'Ｎ', 'Ｏ', 'Ｐ', 'Ｑ', 'Ｒ',
    'Ｓ', 'Ｔ', 'Ｕ', 'Ｖ', 'Ｗ', 'Ｘ', 'Ｙ', 'Ｚ'
  ];
  const smallLatinFullWidth: string[] = [
    'ａ', 'ｂ', 'ｃ', 'ｄ', 'ｅ', 'ｆ', 'ｇ', 'ｈ', 'ｉ',
    'ｊ', 'ｋ', 'ｌ', 'ｍ', 'ｎ', 'ｏ', 'ｐ', 'ｑ', 'ｒ',
    'ｓ', 'ｔ', 'ｕ', 'ｖ', 'ｗ', 'ｘ', 'ｙ', 'ｚ'
  ];
  const capitalLatinBold: string[] = [
    '𝐀', '𝐁', '𝐂', '𝐃', '𝐄', '𝐅', '𝐆', '𝐇', '𝐈', '𝐉', '𝐊', '𝐋', '𝐌',
    '𝐍', '𝐎', '𝐏', '𝐐', '𝐑', '𝐒', '𝐓', '𝐔', '𝐕', '𝐖', '𝐗', '𝐘', '𝐙'
  ];
  const smallLatinBold: string[] = [
    '𝐚', '𝐛', '𝐜', '𝐝', '𝐞', '𝐟', '𝐠', '𝐡', '𝐢', '𝐣', '𝐤', '𝐥', '𝐦',
    '𝐧', '𝐨', '𝐩', '𝐪', '𝐫', '𝐬', '𝐭', '𝐮', '𝐯', '𝐰', '𝐱', '𝐲', '𝐳'
  ];
  const capitalLatinItalic: string[] = [
    '𝐴', '𝐵', '𝐶', '𝐷', '𝐸', '𝐹', '𝐺', '𝐻', '𝐼', '𝐽', '𝐾', '𝐿', '𝑀',
    '𝑁', '𝑂', '𝑃', '𝑄', '𝑅', '𝑆', '𝑇', '𝑈', '𝑉', '𝑊', '𝑋', '𝑌', '𝑍'
  ];
  const smallLatinItalic: string[] = [
    '𝑎', '𝑏', '𝑐', '𝑑', '𝑒', '𝑓', '𝑔', 'ℎ', '𝑖', '𝑗', '𝑘', '𝑙', '𝑚', '𝑛', '𝑜',
    '𝑝', '𝑞', '𝑟', '𝑠', '𝑡', '𝑢', '𝑣', '𝑤', '𝑥', '𝑦', '𝑧',
    // dotless i and j.
    '𝚤', '𝚥'
  ];
  const capitalLatinBoldItalic: string[] = [
    '𝑨', '𝑩', '𝑪', '𝑫', '𝑬', '𝑭', '𝑮', '𝑯', '𝑰', '𝑱', '𝑲', '𝑳', '𝑴',
    '𝑵', '𝑶', '𝑷', '𝑸', '𝑹', '𝑺', '𝑻', '𝑼', '𝑽', '𝑾', '𝑿', '𝒀', '𝒁'
  ];
  const smallLatinBoldItalic: string[] = [
    '𝒂', '𝒃', '𝒄', '𝒅', '𝒆', '𝒇', '𝒈', '𝒉', '𝒊', '𝒋', '𝒌', '𝒍', '𝒎',
    '𝒏', '𝒐', '𝒑', '𝒒', '𝒓', '𝒔', '𝒕', '𝒖', '𝒗', '𝒘', '𝒙', '𝒚', '𝒛'
  ];
  const capitalLatinScript: string[] = [
    '𝒜', 'ℬ', '𝒞', '𝒟', 'ℰ', 'ℱ', '𝒢', 'ℋ', 'ℐ', '𝒥', '𝒦', 'ℒ', 'ℳ', '𝒩', '𝒪',
    '𝒫', '𝒬', 'ℛ', '𝒮', '𝒯', '𝒰', '𝒱', '𝒲', '𝒳', '𝒴', '𝒵',
    // Powerset Cap P.
    '℘'
  ];
  const smallLatinScript: string[] = [
    '𝒶', '𝒷', '𝒸', '𝒹', 'ℯ', '𝒻', 'ℊ', '𝒽', '𝒾', '𝒿', '𝓀', '𝓁', '𝓂', '𝓃', 'ℴ',
    '𝓅', '𝓆', '𝓇', '𝓈', '𝓉', '𝓊', '𝓋', '𝓌', '𝓍', '𝓎', '𝓏',
    // script small l
    'ℓ'
  ];
  const capitalLatinBoldScript: string[] = [
    '𝓐', '𝓑', '𝓒', '𝓓', '𝓔', '𝓕', '𝓖', '𝓗', '𝓘', '𝓙', '𝓚', '𝓛', '𝓜',
    '𝓝', '𝓞', '𝓟', '𝓠', '𝓡', '𝓢', '𝓣', '𝓤', '𝓥', '𝓦', '𝓧', '𝓨', '𝓩'
  ];
  const smallLatinBoldScript: string[] = [
    '𝓪', '𝓫', '𝓬', '𝓭', '𝓮', '𝓯', '𝓰', '𝓱', '𝓲', '𝓳', '𝓴', '𝓵', '𝓶',
    '𝓷', '𝓸', '𝓹', '𝓺', '𝓻', '𝓼', '𝓽', '𝓾', '𝓿', '𝔀', '𝔁', '𝔂', '𝔃'
  ];
  const capitalLatinFraktur: string[] = [
    '𝔄', '𝔅', 'ℭ', '𝔇', '𝔈', '𝔉', '𝔊', 'ℌ', 'ℑ', '𝔍', '𝔎', '𝔏', '𝔐',
    '𝔑', '𝔒', '𝔓', '𝔔', 'ℜ', '𝔖', '𝔗', '𝔘', '𝔙', '𝔚', '𝔛', '𝔜', 'ℨ'
  ];
  const smallLatinFraktur: string[] = [
    '𝔞', '𝔟', '𝔠', '𝔡', '𝔢', '𝔣', '𝔤', '𝔥', '𝔦', '𝔧', '𝔨', '𝔩', '𝔪',
    '𝔫', '𝔬', '𝔭', '𝔮', '𝔯', '𝔰', '𝔱', '𝔲', '𝔳', '𝔴', '𝔵', '𝔶', '𝔷'
  ];
  const capitalLatinDoubleStruck: string[] = [
    '𝔸', '𝔹', 'ℂ', '𝔻', '𝔼', '𝔽', '𝔾', 'ℍ', '𝕀', '𝕁', '𝕂', '𝕃', '𝕄',
    'ℕ', '𝕆', 'ℙ', 'ℚ', 'ℝ', '𝕊', '𝕋', '𝕌', '𝕍', '𝕎', '𝕏', '𝕐', 'ℤ'
  ];
  const smallLatinDoubleStruck: string[] = [
    '𝕒', '𝕓', '𝕔', '𝕕', '𝕖', '𝕗', '𝕘', '𝕙', '𝕚', '𝕛', '𝕜', '𝕝', '𝕞',
    '𝕟', '𝕠', '𝕡', '𝕢', '𝕣', '𝕤', '𝕥', '𝕦', '𝕧', '𝕨', '𝕩', '𝕪', '𝕫'
  ];
  const capitalLatinBoldFraktur: string[] = [
    '𝕬', '𝕭', '𝕮', '𝕯', '𝕰', '𝕱', '𝕲', '𝕳', '𝕴', '𝕵', '𝕶', '𝕷', '𝕸',
    '𝕹', '𝕺', '𝕻', '𝕼', '𝕽', '𝕾', '𝕿', '𝖀', '𝖁', '𝖂', '𝖃', '𝖄', '𝖅'
  ];
  const smallLatinBoldFraktur: string[] = [
    '𝖆', '𝖇', '𝖈', '𝖉', '𝖊', '𝖋', '𝖌', '𝖍', '𝖎', '𝖏', '𝖐', '𝖑', '𝖒',
    '𝖓', '𝖔', '𝖕', '𝖖', '𝖗', '𝖘', '𝖙', '𝖚', '𝖛', '𝖜', '𝖝', '𝖞', '𝖟'
  ];
  const capitalLatinSansSerif: string[] = [
    '𝖠', '𝖡', '𝖢', '𝖣', '𝖤', '𝖥', '𝖦', '𝖧', '𝖨', '𝖩', '𝖪', '𝖫', '𝖬',
    '𝖭', '𝖮', '𝖯', '𝖰', '𝖱', '𝖲', '𝖳', '𝖴', '𝖵', '𝖶', '𝖷', '𝖸', '𝖹'
  ];
  const smallLatinSansSerif: string[] = [
    '𝖺', '𝖻', '𝖼', '𝖽', '𝖾', '𝖿', '𝗀', '𝗁', '𝗂', '𝗃', '𝗄', '𝗅', '𝗆',
    '𝗇', '𝗈', '𝗉', '𝗊', '𝗋', '𝗌', '𝗍', '𝗎', '𝗏', '𝗐', '𝗑', '𝗒', '𝗓'
  ];
  const capitalLatinSansSerifBold: string[] = [
    '𝗔', '𝗕', '𝗖', '𝗗', '𝗘', '𝗙', '𝗚', '𝗛', '𝗜', '𝗝', '𝗞', '𝗟', '𝗠',
    '𝗡', '𝗢', '𝗣', '𝗤', '𝗥', '𝗦', '𝗧', '𝗨', '𝗩', '𝗪', '𝗫', '𝗬', '𝗭'
  ];
  const smallLatinSansSerifBold: string[] = [
    '𝗮', '𝗯', '𝗰', '𝗱', '𝗲', '𝗳', '𝗴', '𝗵', '𝗶', '𝗷', '𝗸', '𝗹', '𝗺',
    '𝗻', '𝗼', '𝗽', '𝗾', '𝗿', '𝘀', '𝘁', '𝘂', '𝘃', '𝘄', '𝘅', '𝘆', '𝘇'
  ];
  const capitalLatinSansSerifItalic: string[] = [
    '𝘈', '𝘉', '𝘊', '𝘋', '𝘌', '𝘍', '𝘎', '𝘏', '𝘐', '𝘑', '𝘒', '𝘓', '𝘔',
    '𝘕', '𝘖', '𝘗', '𝘘', '𝘙', '𝘚', '𝘛', '𝘜', '𝘝', '𝘞', '𝘟', '𝘠', '𝘡'
  ];
  const smallLatinSansSerifItalic: string[] = [
    '𝘢', '𝘣', '𝘤', '𝘥', '𝘦', '𝘧', '𝘨', '𝘩', '𝘪', '𝘫', '𝘬', '𝘭', '𝘮',
    '𝘯', '𝘰', '𝘱', '𝘲', '𝘳', '𝘴', '𝘵', '𝘶', '𝘷', '𝘸', '𝘹', '𝘺', '𝘻'
  ];
  const capitalLatinSansSerifBoldItalic: string[] = [
    '𝘼', '𝘽', '𝘾', '𝘿', '𝙀', '𝙁', '𝙂', '𝙃', '𝙄', '𝙅', '𝙆', '𝙇', '𝙈',
    '𝙉', '𝙊', '𝙋', '𝙌', '𝙍', '𝙎', '𝙏', '𝙐', '𝙑', '𝙒', '𝙓', '𝙔', '𝙕'
  ];
  const smallLatinSansSerifBoldItalic: string[] = [
    '𝙖', '𝙗', '𝙘', '𝙙', '𝙚', '𝙛', '𝙜', '𝙝', '𝙞', '𝙟', '𝙠', '𝙡', '𝙢',
    '𝙣', '𝙤', '𝙥', '𝙦', '𝙧', '𝙨', '𝙩', '𝙪', '𝙫', '𝙬', '𝙭', '𝙮', '𝙯'
  ];
  const capitalLatinMonospace: string[] = [
    '𝙰', '𝙱', '𝙲', '𝙳', '𝙴', '𝙵', '𝙶', '𝙷', '𝙸', '𝙹', '𝙺', '𝙻', '𝙼',
    '𝙽', '𝙾', '𝙿', '𝚀', '𝚁', '𝚂', '𝚃', '𝚄', '𝚅', '𝚆', '𝚇', '𝚈', '𝚉'
  ];
  const smallLatinMonospace: string[] = [
    '𝚊', '𝚋', '𝚌', '𝚍', '𝚎', '𝚏', '𝚐', '𝚑', '𝚒', '𝚓', '𝚔', '𝚕', '𝚖',
    '𝚗', '𝚘', '𝚙', '𝚚', '𝚛', '𝚜', '𝚝', '𝚞', '𝚟', '𝚠', '𝚡', '𝚢', '𝚣'
  ];
  const latinDoubleStruckItalic: string[] = ['ⅅ', 'ⅆ', 'ⅇ', 'ⅈ', 'ⅉ'];

  // Greek Alphabets
  const capitalGreek: string[] = [
    'Α', 'Β', 'Γ', 'Δ', 'Ε', 'Ζ', 'Η', 'Θ', 'Ι', 'Κ', 'Λ', 'Μ',
    'Ν', 'Ξ', 'Ο', 'Π', 'Ρ', 'Σ', 'Τ', 'Υ', 'Φ', 'Χ', 'Ψ', 'Ω'
  ];
  const smallGreek: string[] = [
    'α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'ι', 'κ', 'λ', 'μ', 'ν',
    'ξ', 'ο', 'π', 'ρ', 'ς', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω'
  ];
  const capitalGreekBold: string[] = [
    '𝚨', '𝚩', '𝚪', '𝚫', '𝚬', '𝚭', '𝚮', '𝚯', '𝚰', '𝚱', '𝚲', '𝚳',
    '𝚴', '𝚵', '𝚶', '𝚷', '𝚸', '𝚺', '𝚻', '𝚼', '𝚽', '𝚾', '𝚿', '𝛀'
  ];
  const smallGreekBold: string[] = [
    '𝛂', '𝛃', '𝛄', '𝛅', '𝛆', '𝛇', '𝛈', '𝛉', '𝛊', '𝛋', '𝛌', '𝛍', '𝛎',
    '𝛏', '𝛐', '𝛑', '𝛒', '𝛓', '𝛔', '𝛕', '𝛖', '𝛗', '𝛘', '𝛙', '𝛚'
  ];
  const capitalGreekItalic: string[] = [
    '𝛢', '𝛣', '𝛤', '𝛥', '𝛦', '𝛧', '𝛨', '𝛩', '𝛪', '𝛫', '𝛬', '𝛭',
    '𝛮', '𝛯', '𝛰', '𝛱', '𝛲', '𝛴', '𝛵', '𝛶', '𝛷', '𝛸', '𝛹', '𝛺'
  ];
  const smallGreekItalic: string[] = [
    '𝛼', '𝛽', '𝛾', '𝛿', '𝜀', '𝜁', '𝜂', '𝜃', '𝜄', '𝜅', '𝜆', '𝜇', '𝜈',
    '𝜉', '𝜊', '𝜋', '𝜌', '𝜍', '𝜎', '𝜏', '𝜐', '𝜑', '𝜒', '𝜓', '𝜔'
  ];
  const capitalGreekBoldItalic: string[] = [
    '𝜜', '𝜝', '𝜞', '𝜟', '𝜠', '𝜡', '𝜢', '𝜣', '𝜤', '𝜥', '𝜦', '𝜧',
    '𝜨', '𝜩', '𝜪', '𝜫', '𝜬', '𝜮', '𝜯', '𝜰', '𝜱', '𝜲', '𝜳', '𝜴'
  ];
  const smallGreekBoldItalic: string[] = [
    '𝜶', '𝜷', '𝜸', '𝜹', '𝜺', '𝜻', '𝜼', '𝜽', '𝜾', '𝜿', '𝝀', '𝝁', '𝝂',
    '𝝃', '𝝄', '𝝅', '𝝆', '𝝇', '𝝈', '𝝉', '𝝊', '𝝋', '𝝌', '𝝍', '𝝎'
  ];
  const capitalGreekSansSerifBold: string[] = [
    '𝝖', '𝝗', '𝝘', '𝝙', '𝝚', '𝝛', '𝝜', '𝝝', '𝝞', '𝝟', '𝝠', '𝝡',
    '𝝢', '𝝣', '𝝤', '𝝥', '𝝦', '𝝨', '𝝩', '𝝪', '𝝫', '𝝬', '𝝭', '𝝮'
  ];
  const smallGreekSansSerifBold: string[] = [
    '𝝰', '𝝱', '𝝲', '𝝳', '𝝴', '𝝵', '𝝶', '𝝷', '𝝸', '𝝹', '𝝺', '𝝻', '𝝼',
    '𝝽', '𝝾', '𝝿', '𝞀', '𝞁', '𝞂', '𝞃', '𝞄', '𝞅', '𝞆', '𝞇', '𝞈'
  ];
  const capitalGreekSansSerifBoldItalic: string[] = [
    '𝞐', '𝞑', '𝞒', '𝞓', '𝞔', '𝞕', '𝞖', '𝞗', '𝞘', '𝞙', '𝞚', '𝞛',
    '𝞜', '𝞝', '𝞞', '𝞟', '𝞠', '𝞢', '𝞣', '𝞤', '𝞥', '𝞦', '𝞧', '𝞨'
  ];
  const smallGreekSansSerifBoldItalic: string[] = [
    '𝞪', '𝞫', '𝞬', '𝞭', '𝞮', '𝞯', '𝞰', '𝞱', '𝞲', '𝞳', '𝞴', '𝞵', '𝞶',
    '𝞷', '𝞸', '𝞹', '𝞺', '𝞻', '𝞼', '𝞽', '𝞾', '𝞿', '𝟀', '𝟁', '𝟂'
  ];
  const greekDoubleStruck: string[] = ['ℼ', 'ℽ', 'ℾ', 'ℿ'];
  const greekSpecial: string[] = ['ϐ', 'ϑ', 'ϕ', 'ϖ', 'ϗ', 'ϰ', 'ϱ', 'ϵ', '϶', 'ϴ'];
  const greekSpecialBold: string[] = ['𝛜', '𝛝', '𝛞', '𝛟', '𝛠', '𝛡'];
  const greekSpecialItalic: string[] = ['𝜖', '𝜗', '𝜘', '𝜙', '𝜚', '𝜛'];
  const greekSpecialSansSerifBold: string[] = ['𝞊', '𝞋', '𝞌', '𝞍', '𝞎', '𝞏'];

  // Other alphabets.
  const hebrewLetters: string[] = ['ℵ', 'ℶ', 'ℷ', 'ℸ'];

  const allLetters: string[] = capitalLatin.concat(
        smallLatin, capitalLatinFullWidth, smallLatinFullWidth,
        capitalLatinBold, smallLatinBold, capitalLatinItalic,
        capitalLatinBoldItalic, smallLatinBoldItalic,
        smallLatinItalic, capitalLatinScript, smallLatinScript,
        capitalLatinBoldScript, smallLatinBoldScript,
        capitalLatinFraktur, smallLatinFraktur,
        capitalLatinDoubleStruck, smallLatinDoubleStruck,
        capitalLatinBoldFraktur, smallLatinBoldFraktur,
        capitalLatinSansSerif, smallLatinSansSerif,
        capitalLatinSansSerifBold, smallLatinSansSerifBold,
        capitalLatinSansSerifItalic, smallLatinSansSerifItalic,
        capitalLatinSansSerifBoldItalic,
        smallLatinSansSerifBoldItalic, capitalLatinMonospace,
        smallLatinMonospace, latinDoubleStruckItalic,
        capitalGreek, smallGreek, capitalGreekBold,
        smallGreekBold, capitalGreekItalic, smallGreekItalic,
        capitalGreekBoldItalic, smallGreekBoldItalic,
        capitalGreekSansSerifBold, smallGreekSansSerifBold,
        greekDoubleStruck, greekSpecial,
        capitalGreekSansSerifBoldItalic,
        smallGreekSansSerifBoldItalic, greekSpecialBold,
        greekSpecialItalic, greekSpecialSansSerifBold,
        hebrewLetters);

  // Operator symbols
  const additions: string[] = [
    '+', '±', '∓', '∔', '∧', '∨', '∩', '∪', '⊌', '⊍', '⊎', '⊓', '⊔', '⊝',
    '⊞', '⊤', '⊥', '⊺', '⊻', '⊼', '⋄', '⋎', '⋏', '⋒', '⋓', '⩞', '⊕', '⋔'
  ];

  /**
   * Invisible operator for plus.
   */
  const invisiblePlus_: string = SemanticUtil.numberToUnicode(0x2064);
  additions.push(this.invisiblePlus_);

  const multiplications: string[] = [
    '†', '‡', '∐', '∗', '∘', '∙', '≀', '⊚', '⊛', '⊠', '⊡', '⋅',
    '⋆', '⋇', '⋈', '⋉', '⋊', '⋋', '⋌', '○', '·', '*', '⊗', '⊙'
  ];
    /**
     * Invisible operator for multiplication.
     */
  const invisibleTimes_: string = SemanticUtil.numberToUnicode(0x2062);
  multiplications.push(invisibleTimes_);

  const subtractions: string[] = [
    '-', '⁒', '⁻', '₋', '−', '∖', '∸',  '≂',  '⊖', '⊟', '➖',
    '⨩', '⨪', '⨫', '⨬', '⨺', '⩁', '﹣', '－', '‐', '‑'
  ];
  const divisions: string[] = ['/', '÷', '⁄', '∕', '⊘', '⟌', '⦼', '⨸'];
  /**
   * Invisible operator for function application.
   */
  const functionApplication_: string = SemanticUtil.numberToUnicode(0x2061);

  // Relation symbols
  const equalities: string[] = [
    '=', '~', '⁼', '₌', '∼', '∽', '≃', '≅',  '≈',  '≊', '≋', '≌', '≍', '≎',
    '≑', '≒', '≓', '≔', '≕', '≖', '≗', '≘',  '≙',  '≚', '≛', '≜', '≝', '≞',
    '≟', '≡', '≣', '⧤', '⩦', '⩮', '⩯', '⩰',  '⩱',  '⩲', '⩳', '⩴', '⩵', '⩶',
    '⩷', '⩸', '⋕', '⩭', '⩪', '⩫', '⩬', '﹦', '＝', '⩬', '⊜', '∷'
  ];
  const inequalities: string[] = [
    '<', '>', '≁', '≂', '≄', '≆', '≇',  '≉',  '≏',  '≐', '≠', '≢', '≤', '≥',
    '≦', '≧', '≨', '≩', '≪', '≫', '≬',  '≭',  '≮',  '≯', '≰', '≱', '≲', '≳',
    '≴', '≵', '≶', '≷', '≸', '≹', '≺',  '≻',  '≼',  '≽', '≾', '≿', '⊀', '⊁',
    '⋖', '⋗', '⋘', '⋙', '⋚', '⋛', '⋜',  '⋝',  '⋞',  '⋟', '⋠', '⋡', '⋦', '⋧',
    '⋨', '⋩', '⩹', '⩺', '⩻', '⩼', '⩽',  '⩾',  '⩿',  '⪀', '⪁', '⪂', '⪃', '⪄',
    '⪅', '⪆', '⪇', '⪈', '⪉', '⪊', '⪋',  '⪌',  '⪍',  '⪎', '⪏', '⪐', '⪑', '⪒',
    '⪓', '⪔', '⪕', '⪖', '⪗', '⪘', '⪙',  '⪚',  '⪛',  '⪜', '⪝', '⪞', '⪟', '⪠',
    '⪡', '⪢', '⪣', '⪤', '⪥', '⪦', '⪧',  '⪨',  '⪩',  '⪪', '⪫', '⪬', '⪭', '⪮',
    '⪯', '⪰', '⪱', '⪲', '⪳', '⪴', '⪵',  '⪶',  '⪷',  '⪸', '⪹', '⪺', '⪻', '⪼',
    '⫷', '⫸', '⫹', '⫺', '⧀', '⧁', '﹤', '﹥', '＜', '＞'
  ];
  const setRelations: string[] = [
    '⋢', '⋣', '⋤', '⋥', '⊂', '⊃', '⊄', '⊅', '⊆', '⊇', '⊈', '⊉', '⊊', '⊋',
    '⊏', '⊐', '⊑', '⊒', '⪽', '⪾', '⪿', '⫀', '⫁', '⫂', '⫃', '⫄', '⫅', '⫆',
    '⫇', '⫈', '⫉', '⫊', '⫋', '⫌', '⫍', '⫎', '⫏', '⫐', '⫑', '⫒', '⫓', '⫔',
    '⫕', '⫖', '⫗', '⫘', '⋐', '⋑', '⋪', '⋫', '⋬', '⋭', '⊲', '⊳', '⊴', '⊵'
  ];
  const elementRelations: string[] = [
    '∈', '∉', '∊', '∋', '∌', '∍', '⋲', '⋳', '⋴', '⋵',
    '⋶', '⋷', '⋸', '⋹', '⋺', '⋻', '⋼', '⋽', '⋾', '⋿',
  ];
  const relations: string[] = [
    // TODO (sorge): Add all the other relations. Currently mainly tacks and
    // turnstyles.
    '⊢', '⊣', '⊦', '⊧', '⊨', '⊩', '⊪', '⊫', '⊬', '⊭', '⊮', '⊯', '⫞', '⫟',
    '⫠', '⫡', '⫢', '⫣', '⫤', '⫥', '⫦', '⫧', '⫨', '⫩', '⫪', '⫫', '⫬', '⫭'
  ];
  const arrows: string[] = [
    '←', '↑', '→', '↓', '↔', '↕', '↖', '↗', '↘', '↙', '↚', '↛', '↜', '↝', '↞',
    '↟', '↠', '↡', '↢', '↣', '↤', '↥', '↦', '↧', '↨', '↩', '↪', '↫', '↬', '↭',
    '↮', '↯', '↰', '↱', '↲', '↳', '↴', '↵', '↶', '↷', '↸', '↹', '↺', '↻', '⇄',
    '⇅', '⇆', '⇇', '⇈', '⇉', '⇊', '⇍', '⇎', '⇏', '⇐', '⇑', '⇒', '⇓', '⇔', '⇕',
    '⇖', '⇗', '⇘', '⇙', '⇚', '⇛', '⇜', '⇝', '⇞', '⇟', '⇠', '⇡', '⇢', '⇣', '⇤',
    '⇥', '⇦', '⇧', '⇨', '⇩', '⇪', '⇫', '⇬', '⇭', '⇮', '⇯', '⇰', '⇱', '⇲', '⇳',
    '⇴', '⇵', '⇶', '⇷', '⇸', '⇹', '⇺', '⇻', '⇼', '⇽', '⇾', '⇿', '⌁', '⌃', '⌄',
    '⌤', '⎋', '➔', '➘', '➙', '➚', '➛', '➜', '➝', '➞', '➟', '➠', '➡', '➢', '➣',
    '➤', '➥', '➦', '➧', '➨', '➩', '➪', '➫', '➬', '➭', '➮', '➯', '➱', '➲', '➳',
    '➴', '➵', '➶', '➷', '➸', '➹', '➺', '➻', '➼', '➽', '➾', '⟰', '⟱', '⟲', '⟳',
    '⟴', '⟵', '⟶', '⟷', '⟸', '⟹', '⟺', '⟻', '⟼', '⟽', '⟾', '⟿', '⤀', '⤁', '⤂',
    '⤃', '⤄', '⤅', '⤆', '⤇', '⤈', '⤉', '⤊', '⤋', '⤌', '⤍', '⤎', '⤏', '⤐', '⤑',
    '⤒', '⤓', '⤔', '⤕', '⤖', '⤗', '⤘', '⤙', '⤚', '⤛', '⤜', '⤝', '⤞', '⤟', '⤠',
    '⤡', '⤢', '⤣', '⤤', '⤥', '⤦', '⤧', '⤨', '⤩', '⤪', '⤭', '⤮', '⤯', '⤰', '⤱',
    '⤲', '⤳', '⤴', '⤵', '⤶', '⤷', '⤸', '⤹', '⤺', '⤻', '⤼', '⤽', '⤾', '⤿', '⥀',
    '⥁', '⥂', '⥃', '⥄', '⥅', '⥆', '⥇', '⥈', '⥉', '⥰', '⥱', '⥲', '⥳', '⥴', '⥵',
    '⥶', '⥷', '⥸', '⥹', '⥺', '⥻', '⦳', '⦴', '⦽', '⧪', '⧬', '⧭', '⨗', '⬀', '⬁',
    '⬂', '⬃', '⬄', '⬅', '⬆', '⬇', '⬈', '⬉', '⬊', '⬋', '⬌', '⬍', '⬎', '⬏', '⬐',
    '⬑', '⬰', '⬱', '⬲', '⬳', '⬴', '⬵', '⬶', '⬷', '⬸', '⬹', '⬺', '⬻', '⬼', '⬽',
    '⬾', '⬿', '⭀', '⭁', '⭂', '⭃', '⭄', '⭅', '⭆', '⭇', '⭈', '⭉', '⭊', '⭋', '⭌',
    '￩', '￪', '￫', '￬',
    // Harpoons
    '↼', '↽', '↾', '↿', '⇀', '⇁', '⇂', '⇃', '⇋', '⇌', '⥊', '⥋', '⥌', '⥍', '⥎',
    '⥏', '⥐', '⥑', '⥒', '⥓', '⥔', '⥕', '⥖', '⥗', '⥘', '⥙', '⥚', '⥛', '⥜', '⥝',
    '⥞', '⥟', '⥠', '⥡', '⥢', '⥣', '⥤', '⥥', '⥦', '⥧', '⥨', '⥩', '⥪', '⥫', '⥬',
    '⥭', '⥮', '⥯', '⥼', '⥽', '⥾', '⥿'
  ];

  // Big operation symbols
  const sumOps: string[] = [
    '⅀',  // double struck
    '∏', '∐', '∑', '⋀', '⋁', '⋂', '⋃', '⨀', '⨁', '⨂', '⨃',
    '⨄', '⨅', '⨆', '⨇', '⨈', '⨉', '⨊', '⨋', '⫼', '⫿'
  ];
  const intOps: string[] = [
    '∫', '∬', '∭', '∮', '∯', '∰', '∱', '∲', '∳', '⨌', '⨍', '⨎', '⨏',
    '⨐', '⨑', '⨒', '⨓', '⨔', '⨕', '⨖', '⨗', '⨘', '⨙', '⨚', '⨛', '⨜'
  ];
  const geometryOps: string[] = [
    '∟', '∠', '∡', '∢', '⊾', '⊿',
    // TODO: Add the entire geometric shape set programmatically.
    '△', '▷', '▽', '◁'
  ];
  const prefixOps: string[] = ['∀', '∃', '∆', '∇', '∂', '∁', '∄'];
  const prefixOpsBold: string[] = ['𝛁', '𝛛', '𝟊', '𝟋'];
  const prefixOpsItalic: string[] = ['𝛻', '𝜕'];
  const prefixOpsSansSerifBold: string[] = ['𝝯', '𝞉'];
  // TODO (sorge) Insert nabla, differential operators sans serif bold italic

  const operatorBits: string[] =
      // TODO (sorge) What to do if single glyphs of big ops occur on their own.
      ['⌠', '⌡', '⎶', '⎪', '⎮', '⎯', '⎲', '⎳', '⎷'];

  // Accents.
  // TODO (sorge) Add accented characters.

  // Numbers.
  // Digits.
  const digitsNormal: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const digitsFullWidth: string[] =
      ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９'];
  const digitsBold: string[] = ['𝟎', '𝟏', '𝟐', '𝟑', '𝟒', '𝟓', '𝟔', '𝟕', '𝟖', '𝟗'];
  const digitsDoubleStruck: string[] =
      ['𝟘', '𝟙', '𝟚', '𝟛', '𝟜', '𝟝', '𝟞', '𝟟', '𝟠', '𝟡'];
  const digitsSansSerif: string[] =
      ['𝟢', '𝟣', '𝟤', '𝟥', '𝟦', '𝟧', '𝟨', '𝟩', '𝟪', '𝟫'];
  const digitsSansSerifBold: string[] =
      ['𝟬', '𝟭', '𝟮', '𝟯', '𝟰', '𝟱', '𝟲', '𝟳', '𝟴', '𝟵'];
  const digitsMonospace: string[] =
      ['𝟶', '𝟷', '𝟸', '𝟹', '𝟺', '𝟻', '𝟼', '𝟽', '𝟾', '𝟿'];
  const digitsSuperscript: string[] =
      ['²', '³', '¹', '⁰', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹'];
  const digitsSubscript: string[] =
      ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉'];
  const fractions: string[] = [
    '¼', '½', '¾', '⅐', '⅑', '⅒', '⅓', '⅔', '⅕', '⅖',
    '⅗', '⅘', '⅙', '⅚', '⅛', '⅜', '⅝', '⅞', '⅟', '↉'
  ];
  const enclosedNumbers: string[] =
      // Encircled numbers.
      [
        '①',  '②',  '③',  '④',  '⑤',  '⑥',  '⑦',  '⑧',  '⑨',  '⑩',  '⑪',
        '⑫',  '⑬',  '⑭',  '⑮',  '⑯',  '⑰',  '⑱',  '⑲',  '⑳',  '⓪',  '⓫',
        '⓬',  '⓭',  '⓮',  '⓯',  '⓰',  '⓱',  '⓲',  '⓳',  '⓴',  '⓵',  '⓶',
        '⓷',  '⓸',  '⓹',  '⓺',  '⓻',  '⓼',  '⓽',  '⓾',  '⓿',  '❶',  '❷',
        '❸',  '❹',  '❺',  '❻',  '❼',  '❽',  '❾',  '❿',  '➀',  '➁',  '➂',
        '➃',  '➄',  '➅',  '➆',  '➇',  '➈',  '➉',  '➊',  '➋',  '➌',  '➍',
        '➎',  '➏',  '➐',  '➑',  '➒',  '➓',  '㉈', '㉉', '㉊', '㉋', '㉌',
        '㉍', '㉎', '㉏', '㉑', '㉒', '㉓', '㉔', '㉕', '㉖', '㉗', '㉘',
        '㉙', '㉚', '㉛', '㉜', '㉝', '㉞', '㉟', '㊱', '㊲', '㊳', '㊴',
        '㊵', '㊶', '㊷', '㊸', '㊹', '㊺', '㊻', '㊼', '㊽', '㊾', '㊿'
      ];
  const fencedNumbers: string[] =
      // Numbers in Parenthesis.
      [
        '⑴', '⑵', '⑶', '⑷', '⑸', '⑹', '⑺', '⑻', '⑼', '⑽',
        '⑾', '⑿', '⒀', '⒁', '⒂', '⒃', '⒄', '⒅', '⒆', '⒇'
      ];
  const punctuatedNumbers: string[] =
      // Numbers with other punctuation.
      [
        '⒈', '⒉', '⒊', '⒋', '⒌', '⒍', '⒎', '⒏', '⒐', '⒑', '⒒',
        '⒓', '⒔', '⒕', '⒖', '⒗', '⒘', '⒙', '⒚', '⒛',  // full stop.
        '🄀', '🄁', '🄂', '🄃', '🄄', '🄅', '🄆', '🄇', '🄈', '🄉', '🄊' // comma.
      ];
    /**
     * Array of all single digits.
     */
  const digits: string[] = digitsNormal.concat(
        digitsFullWidth, digitsBold, digitsDoubleStruck,
        digitsSansSerif, digitsSansSerifBold, digitsMonospace);
  /**
   * Array of all non-digit number symbols.
   */
  const numbers: string[] = fractions;
  const otherNumbers: string[] = digitsSuperscript.concat(
    digitsSubscript, enclosedNumbers, fencedNumbers,
    punctuatedNumbers);

  /**
   * Array of all number symbols.
   */
  const allNumbers: string[] = digits.concat(numbers, otherNumbers);

  // Functions.
  const trigonometricFunctions: string[] = [
    'cos', 'cot', 'csc', 'sec', 'sin', 'tan', 'arccos', 'arccot', 'arccsc',
    'arcsec', 'arcsin', 'arctan', 'arc cos', 'arc cot', 'arc csc', 'arc sec',
    'arc sin', 'arc tan'
  ];
  const hyperbolicFunctions: string[] = [
    'cosh', 'coth', 'csch', 'sech', 'sinh', 'tanh', 'arcosh', 'arcoth',
    'arcsch', 'arsech', 'arsinh', 'artanh', 'arccosh', 'arccoth', 'arccsch',
    'arcsech', 'arcsinh', 'arctanh'
  ];
  const algebraicFunctions: string[] =
      ['deg', 'det', 'dim', 'hom', 'ker', 'Tr', 'tr'];
  const elementaryFunctions: string[] =
      ['log', 'ln', 'lg', 'exp', 'expt', 'gcd', 'gcd', 'arg', 'im', 're', 'Pr'];
  /**
   * All predefined prefix functions.
   */
  const prefixFunctions: string[] = trigonometricFunctions.concat(
    hyperbolicFunctions, algebraicFunctions,
    elementaryFunctions);

  /**
   * Limit functions are handled separately as they can have lower (and upper)
   * limiting expressions.
   */
  const limitFunctions: string[] = [
    'inf', 'lim', 'liminf', 'limsup', 'max', 'min', 'sup', 'injlim', 'projlim',
    'inj lim', 'proj lim'
  ];
  const infixFunctions: string[] = ['mod', 'rem'];

  /**
   * Default assignments of semantic attributes.
   * Assigns sets of symbols to meaning.
   */
  const symbolSetToSemantic_: {
    set: string[],
    role: SemanticAttr.Role,
    type: SemanticAttr.Type,
    font: SemanticAttr.Font
  }[] = [
      // Punctuation
      {
        set: generalPunctuations,
        type: SemanticAttr.Type.PUNCTUATION,
        role: SemanticAttr.Role.UNKNOWN
      },
      {
        set: colons,
        type: SemanticAttr.Type.PUNCTUATION,
        role: SemanticAttr.Role.COLON
      },
      {
        set: commas,
        type: SemanticAttr.Type.PUNCTUATION,
        role: SemanticAttr.Role.COMMA
      },
      {
        set: ellipses,
        type: SemanticAttr.Type.PUNCTUATION,
        role: SemanticAttr.Role.ELLIPSIS
      },
      {
        set: fullStops,
        type: SemanticAttr.Type.PUNCTUATION,
        role: SemanticAttr.Role.FULLSTOP
      },
      {
        set: dashes,
        type: SemanticAttr.Type.PUNCTUATION,
        role: SemanticAttr.Role.DASH
      },
      {
        set: primes,
        type: SemanticAttr.Type.PUNCTUATION,
        role: SemanticAttr.Role.PRIME
      },
      {
        set: degrees,
        type: SemanticAttr.Type.PUNCTUATION,
        role: SemanticAttr.Role.DEGREE
      },
      // Fences
      {
        set: leftFences,
        type: SemanticAttr.Type.FENCE,
        role: SemanticAttr.Role.OPEN
      },
      {
        set: rightFences,
        type: SemanticAttr.Type.FENCE,
        role: SemanticAttr.Role.CLOSE
      },
      {
        set: topFences,
        type: SemanticAttr.Type.FENCE,
        role: SemanticAttr.Role.TOP
      },
      {
        set: bottomFences,
        type: SemanticAttr.Type.FENCE,
        role: SemanticAttr.Role.BOTTOM
      },
      {
        set: neutralFences,
        type: SemanticAttr.Type.FENCE,
        role: SemanticAttr.Role.NEUTRAL
      },
      // Single characters.
      // Latin alphabets.
      {
        set: smallLatin,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.NORMAL
      },
      {
        set: capitalLatin,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.NORMAL
      },
      {
        set: smallLatinFullWidth,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.NORMAL
      },
      {
        set: capitalLatinFullWidth,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.NORMAL
      },
      {
        set: smallLatinBold,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.BOLD
      },
      {
        set: capitalLatinBold,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.BOLD
      },
      {
        set: smallLatinItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.ITALIC
      },
      {
        set: capitalLatinItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.ITALIC
      },
      {
        set: smallLatinBoldItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.BOLDITALIC
      },
      {
        set: capitalLatinBoldItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.BOLDITALIC
      },
      {
        set: smallLatinScript,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.SCRIPT
      },
      {
        set: capitalLatinScript,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.SCRIPT
      },
      {
        set: smallLatinBoldScript,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.BOLDSCRIPT
      },
      {
        set: capitalLatinBoldScript,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.BOLDSCRIPT
      },
      {
        set: smallLatinFraktur,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.FRAKTUR
      },
      {
        set: capitalLatinFraktur,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.FRAKTUR
      },
      {
        set: smallLatinDoubleStruck,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.DOUBLESTRUCK
      },
      {
        set: capitalLatinDoubleStruck,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.DOUBLESTRUCK
      },
      {
        set: smallLatinBoldFraktur,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.BOLDFRAKTUR
      },
      {
        set: capitalLatinBoldFraktur,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.BOLDFRAKTUR
      },
      {
        set: smallLatinSansSerif,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.SANSSERIF
      },
      {
        set: capitalLatinSansSerif,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.SANSSERIF
      },
      {
        set: smallLatinSansSerifBold,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.SANSSERIFBOLD
      },
      {
        set: capitalLatinSansSerifBold,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.SANSSERIFBOLD
      },
      {
        set: smallLatinSansSerifItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.SANSSERIFITALIC
      },
      {
        set: capitalLatinSansSerifItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.SANSSERIFITALIC
      },
      {
        set: smallLatinSansSerifBoldItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.SANSSERIFBOLDITALIC
      },
      {
        set: capitalLatinSansSerifBoldItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.SANSSERIFBOLDITALIC
      },
      {
        set: smallLatinMonospace,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.MONOSPACE
      },
      {
        set: capitalLatinMonospace,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.MONOSPACE
      },
      {
        set: latinDoubleStruckItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.LATINLETTER,
        font: SemanticAttr.Font.DOUBLESTRUCKITALIC
      },
      // Greek alphabets.
      {
        set: smallGreek,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.NORMAL
      },
      {
        set: capitalGreek,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.NORMAL
      },
      {
        set: smallGreekBold,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.BOLD
      },
      {
        set: capitalGreekBold,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.BOLD
      },
      {
        set: smallGreekItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.ITALIC
      },
      {
        set: capitalGreekItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.ITALIC
      },
      {
        set: smallGreekBoldItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.BOLDITALIC
      },
      {
        set: capitalGreekBoldItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.BOLDITALIC
      },
      {
        set: smallGreekSansSerifBold,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.SANSSERIFBOLD
      },
      {
        set: capitalGreekSansSerifBold,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.SANSSERIFBOLD
      },
      {
        set: capitalGreekSansSerifBoldItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.SANSSERIFBOLDITALIC
      },
      {
        set: smallGreekSansSerifBoldItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.SANSSERIFBOLDITALIC
      },
      {
        set: greekDoubleStruck,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.DOUBLESTRUCK
      },
      {
        set: greekSpecial,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.NORMAL
      },
      {
        set: greekSpecialBold,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.BOLD
      },
      {
        set: greekSpecialItalic,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.ITALIC
      },
      {
        set: greekSpecialSansSerifBold,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.GREEKLETTER,
        font: SemanticAttr.Font.SANSSERIFBOLD
      },
      // Other alphabets.
      {
        set: hebrewLetters,
        type: SemanticAttr.Type.IDENTIFIER,
        role: SemanticAttr.Role.OTHERLETTER,
        font: SemanticAttr.Font.NORMAL
      },
      // Numbers.
      {
        set: digitsNormal,
        type: SemanticAttr.Type.NUMBER,
        role: SemanticAttr.Role.INTEGER,
        font: SemanticAttr.Font.NORMAL
      },
      {
        set: digitsFullWidth,
        type: SemanticAttr.Type.NUMBER,
        role: SemanticAttr.Role.INTEGER,
        font: SemanticAttr.Font.NORMAL
      },
      {
        set: digitsBold,
        type: SemanticAttr.Type.NUMBER,
        role: SemanticAttr.Role.INTEGER,
        font: SemanticAttr.Font.BOLD
      },
      {
        set: digitsDoubleStruck,
        type: SemanticAttr.Type.NUMBER,
        role: SemanticAttr.Role.INTEGER,
        font: SemanticAttr.Font.DOUBLESTRUCK
      },
      {
        set: digitsSansSerif,
        type: SemanticAttr.Type.NUMBER,
        role: SemanticAttr.Role.INTEGER,
        font: SemanticAttr.Font.SANSSERIF
      },
      {
        set: digitsSansSerifBold,
        type: SemanticAttr.Type.NUMBER,
        role: SemanticAttr.Role.INTEGER,
        font: SemanticAttr.Font.SANSSERIFBOLD
      },
      {
        set: digitsMonospace,
        type: SemanticAttr.Type.NUMBER,
        role: SemanticAttr.Role.INTEGER,
        font: SemanticAttr.Font.MONOSPACE
      },
      {
        set: numbers,
        type: SemanticAttr.Type.NUMBER,
        role: SemanticAttr.Role.FLOAT
      },
      {
        set: otherNumbers,
        type: SemanticAttr.Type.NUMBER,
        role: SemanticAttr.Role.OTHERNUMBER
      },
      // Operators.
      {
        set: additions,
        type: SemanticAttr.Type.OPERATOR,
        role: SemanticAttr.Role.ADDITION
      },
      {
        set: multiplications,
        type: SemanticAttr.Type.OPERATOR,
        role: SemanticAttr.Role.MULTIPLICATION
      },
      {
        set: subtractions,
        type: SemanticAttr.Type.OPERATOR,
        role: SemanticAttr.Role.SUBTRACTION
      },
      {
        set: divisions,
        type: SemanticAttr.Type.OPERATOR,
        role: SemanticAttr.Role.DIVISION
      },
      {
        set: prefixOps,
        type: SemanticAttr.Type.OPERATOR,
        role: SemanticAttr.Role.PREFIXOP
      },
      {
        set: prefixOpsBold,
        type: SemanticAttr.Type.OPERATOR,
        role: SemanticAttr.Role.PREFIXOP,
        font: SemanticAttr.Font.BOLD
      },
      {
        set: prefixOpsItalic,
        type: SemanticAttr.Type.OPERATOR,
        role: SemanticAttr.Role.PREFIXOP,
        font: SemanticAttr.Font.ITALIC
      },
      {
        set: prefixOpsSansSerifBold,
        type: SemanticAttr.Type.OPERATOR,
        role: SemanticAttr.Role.PREFIXOP,
        font: SemanticAttr.Font.SANSSERIFBOLD
      },
      // Relations
      {
        set: equalities,
        type: SemanticAttr.Type.RELATION,
        role: SemanticAttr.Role.EQUALITY
      },
      {
        set: inequalities,
        type: SemanticAttr.Type.RELATION,
        role: SemanticAttr.Role.INEQUALITY
      },
      {
        set: setRelations,
        type: SemanticAttr.Type.RELATION,
        role: SemanticAttr.Role.SET
      },
      {
        set: elementRelations,
        type: SemanticAttr.Type.OPERATOR,
        // TODO: Changes that to relation once speech rules are separated
        //       as this has effects on clearspeak.
        role: SemanticAttr.Role.ELEMENT
      },
      {
        set: relations,
        type: SemanticAttr.Type.RELATION,
        role: SemanticAttr.Role.UNKNOWN
      },
      {
        set: arrows,
        type: SemanticAttr.Type.RELATION,
        role: SemanticAttr.Role.ARROW
      },
      // Large operators
      {
        set: sumOps,
        type: SemanticAttr.Type.LARGEOP,
        role: SemanticAttr.Role.SUM
      },
      {
        set: intOps,
        type: SemanticAttr.Type.LARGEOP,
        role: SemanticAttr.Role.INTEGRAL
      },
      {
        set: geometryOps,  // TODO: Change that after speech rule work?
        type: SemanticAttr.Type.OPERATOR,
        role: SemanticAttr.Role.GEOMETRY
      },
      // Functions
      {
        set: limitFunctions,
        type: SemanticAttr.Type.FUNCTION,
        role: SemanticAttr.Role.LIMFUNC
      },
      {
        set: prefixFunctions,
        type: SemanticAttr.Type.FUNCTION,
        role: SemanticAttr.Role.PREFIXFUNC
      },
      {
        set: infixFunctions,
        type: SemanticAttr.Type.OPERATOR,
        role: SemanticAttr.Role.PREFIXFUNC
      }
    ];

  /**
   * Initializes the dictionary mapping strings to meaning.
   * @return The dictionary mapping strings to
   *     semantic attributes.
   */
  const meaning_: {[key: string]: SemanticMeaning} = function() {
    let result = {};
    for (let i = 0, set; set = symbolSetToSemantic_[i]; i++) {
      set.set.forEach(function(symbol) {
        result[symbol] = {
          role: set.role || SemanticAttr.Role.UNKNOWN,
          type: set.type || SemanticAttr.Type.UNKNOWN,
          font: set.font || SemanticAttr.Font.UNKNOWN
        };
      });
    }
    return result;
  }();


  /**
   * Equality on meaning objects.
   * @param meaning1 First meaning.
   * @param meaning2 Second meaning.
   * @return True if both contain the same field entries.
   */
  export function equal(meaning1: SemanticMeaning, meaning2: SemanticMeaning): boolean {
    return meaning1.type === meaning2.type && meaning1.role === meaning2.role &&
        meaning1.font === meaning2.font;
  }


  /**
   * Lookup the semantic type of a symbol.
   * @param symbol The symbol to which we want to determine the type.
   * @return The semantic type of the symbol.
   */
  export function lookupType(symbol: string): SemanticAttr.Type {
    return SemanticAttr.Type.UNKNOWN;
  }


  /**
   * Lookup the semantic role of a symbol.
   * @param symbol The symbol to which we want to determine the role.
   * @return The semantic role of the symbol.
   */
  export function lookupRole(symbol: string): SemanticAttr.Role {
    return SemanticAttr.Role.UNKNOWN;
  }


  /**
   * Lookup the semantic meaning of a symbol in terms of type and role.
   * @param symbol The symbol to which we want to determine the meaning.
   * @return The semantic meaning of the symbol.
   */
  export function lookupMeaning(symbol: string): SemanticMeaning {
    return this.meaning_[symbol] || {
      role: SemanticAttr.Role.UNKNOWN,
      type: SemanticAttr.Type.UNKNOWN,
      font: SemanticAttr.Font.UNKNOWN
    };
  }


  /**
   * String representation of the invisible times unicode character.
   * @return The invisible times character.
   */
  export function invisibleTimes(): string {
    return invisibleTimes_;
  }


  /**
   * String representation of the invisible plus unicode character.
   * @return The invisible plus character.
   */
  export function invisiblePlus(): string {
    return invisiblePlus_;
  }


  /**
   * String representation of the invisible comma unicode character.
   * @return The invisible comma character.
   */
  export function invisibleComma(): string {
    return invisibleComma_;
  }


  /**
   * String representation of the function application character.
   * @return The invisible function application character.
   */
  export function functionApplication(): string {
    return functionApplication_;
  }


  /**
   * Decide when two fences match. Currently we match any right to left
   * or bottom to top fence and neutral to neutral.
   * @param open Opening fence.
   * @param close Closing fence.
   * @return True if the fences are matching.
   */
  export function isMatchingFenceRole(open: string, close: string): boolean {
    return open === SemanticAttr.Role.OPEN &&
      close === SemanticAttr.Role.CLOSE ||
      open === SemanticAttr.Role.NEUTRAL &&
      close === SemanticAttr.Role.NEUTRAL ||
      open === SemanticAttr.Role.TOP && close === SemanticAttr.Role.BOTTOM;
  }

  /**
   * Decide when opening and closing fences match. For neutral fences they have
   * to be the same.
   *
   * @param {string} open Opening fence.
   * @param {string} close Closing fence.
   * @return {boolean} True if the fences are matching.
   */
  export function isMatchingFence(open: string, close: string): boolean {
    if (this.neutralFences.indexOf(open) !== -1) {
      return open === close;
    }
    return this.openClosePairs[open] === close ||
        this.topBottomPairs[open] === close;
  }


  /**
   * Determines if a fence is an opening fence.
   * @param fence Opening fence.
   * @return True if the fence is open or neutral.
   */
  export function isOpeningFence(fence: SemanticAttr.Role): boolean {
    return fence === SemanticAttr.Role.OPEN ||
        fence === SemanticAttr.Role.NEUTRAL;
  }


  /**
   * Determines if a fence is a closing fence.
   * @param fence Closing fence.
   * @return True if the fence is close or neutral.
   */
  export function isClosingFence(fence: SemanticAttr.Role): boolean {
    return fence === SemanticAttr.Role.CLOSE ||
        fence === SemanticAttr.Role.NEUTRAL;
  }


  /**
   * Determines if a symbol type can be embellished. Primitives that can be
   * embellished are operators, punctuations, relations, and fences.
   * @param type The type.
   * @return True if the type can be embellished.
   */
  export function isEmbellishedType(type: SemanticAttr.Type): boolean {
    return type === SemanticAttr.Type.OPERATOR ||
        type === SemanticAttr.Type.RELATION ||
        type === SemanticAttr.Type.FENCE ||
        type === SemanticAttr.Type.PUNCTUATION;
  }


  // TODO (sorge) Make this depended on position in the alphabets.
  /**
   * Check if a character is a small 'd' in some font.
   * @param chr The character string.
   * @return True if the character is indeed a single small d.
   */
  export function isCharacterD(chr: string): boolean {
    let Ds =
        ['d', 'ⅆ', 'ｄ', '𝐝', '𝑑', '𝒹', '𝓭', '𝔡', '𝕕', '𝖉', '𝖽', '𝗱', '𝘥', '𝚍'];
    return Ds.indexOf(chr) !== -1;
  }

}

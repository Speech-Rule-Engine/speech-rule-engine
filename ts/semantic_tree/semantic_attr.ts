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
} from './semantic_meaning';
import * as Alphabet from '../speech_rules/alphabet';


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


const meaning_: Map<string, SemanticMeaning> = new Map();

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
   * @param kind The kind of annotation.
   * @param char The character to define a secondary meaning on.
   * @param annotation Optionally an annotation value. Default is `kind`.
   */
  public set(kind: SemanticSecondary, char: string, annotation = '') {
    super.set(this.secKey(kind, char), annotation || kind);
    return this;
  }

  /**
   * @override
   *
   * @param kind The kind of annotation.
   * @param char The character to look up.
   */
  public has(kind: SemanticSecondary, char: string = '') {
    return super.has(this.secKey(kind, char));
  }

  /**
   * @override
   *
   * @param kind The kind of annotation.
   * @param char The character to look up.
   */
  public get(kind: SemanticSecondary, char: string = '') {
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

  export const Secondary = new secondaryMap();

};

/**
 * Contains the basic mappings of characters/symbols and functions to semantic
 * attributes.
 *
 * Observe that all characters are given as hex code number in order to ease the
 * comparison with those in the JSON files that define speech rules per
 * character.
 */
// Punctuation Characters.
export const generalPunctuations: string[] = [
  '#',
  '%',
  '&',
  '@',
  '\\',
  '§',
  '¶',
  '‗',
  '•',
  '‣',
  '․',
  '‥',
  '‧',
  '‰',
  '‱',
  '※',
  '⁁',
  '⁂',
  '⁃',
  '⁋',
  '⁌',
  '⁍',
  '⁐',
  '⁕',
  '⁖',
  '⁘',
  '⁙',
  '⁚',
  '⁛',
  '⁜',
  '⁝',
  '⁞',
  '﹅',
  '﹆',
  '﹟',
  '﹠',
  '﹨',
  '﹪',
  '﹫',
  '＃',
  '％',
  '＆',
  '／',
  '＠',
  '＼',
  '∴',
  '∵',
  '⁉',
  '‼',
  '¿',
  '⁇',
  '⁈',
  '¡',
];

export const quotes: string[] = [
  '"',
  '︐',
  '＂',
  '＇',
  '˝',
  '‘',
  '’',
  '‚',
  '‛',
  '“',
  '”',
  '„',
  '‟',
  '‹',
  '›',
  '»',
  '«',
];
export const semicolons: string[] = [
  ';',
  '⁏',
  '︔',
  '﹔',
  '；',
  '⨾',
  '⨟'
];
export const questionmarks: string[] = [
    '?',
  '‽',
  '︖',
  '﹖',
  '？'
]
export const exclamationmarks: string[] = [
  '!',
  '︕',
  '﹗',
  '！',
];
export const colons: string[] = ['︓', ':', '：', '﹕', '︰', '⦂'];
export const commas: string[] = ['，', '﹐', ',', NamedSymbol.invisibleComma];
export const ellipses: string[] = ['…', '⋮', '⋯', '⋰', '⋱', '︙'];
export const fullStops: string[] = ['.', '﹒', '．'];
export const dashes: string[] = [
  '¯',
  '‾',
  '‒',
  '–',
  '—',
  '―',
  '﹘',
  '-',
  '⁻',
  '₋',
  '−',
  '➖',
  '﹣',
  '－',
  '‐',
  '‑',
  '‾',
  '_',
  '﹍',
  '﹎',
  '﹏',
  '＿',
  '￣',
  '﹉',
  '﹊',
  '﹋',
  '﹌',
];
export const tildes: string[] = ['~', '̃', '∼', '˜', '∽', '˷', '̴', '̰', '〜', '～', '⁓'];
export const primes: string[] = ["'", '′', '″', '‴', '‵', '‶', '‷', '⁗', 'ʹ', 'ʺ'];
export const degrees: string[] = ['°'];
export const overaccents: string[] = [
  '^',
  'ˇ',
  '`',
  '¨',
  'ª',
  '´',
'º',
'˘',
'˙',
'˚',
'⁀',
'⁺',
'⁽',
'⁾',
'＾',
'｀',
];
export const underaccents: string[] = [
  '¸',
'˛',
'‿',
'⁔',
'₊',
'₍',
'₎',
  '‸',
]

// Fences.
// Fences are treated slightly differently from other symbols as we want to
// record pairs of opening/closing and top/bottom fences.
/**
 * Mapping opening to closing fences.
 */
export const openClosePairs: { [key: string]: string } = {
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
export const topBottomPairs: { [key: string]: string } = {
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

export const leftFences: string[] = Object.keys(openClosePairs);
export const rightFences: string[] = Object.values(openClosePairs);
rightFences.push('〟');
export const topFences: string[] = Object.keys(topBottomPairs);
export const bottomFences: string[] = Object.values(topBottomPairs);

export const neutralFences: string[] = [
  '|',
  '¦',
  '∣',
  '⏐',
  '⎸',
  '⎹',
  '❘',
  '｜',
  '￤',
  '︱',
  '︲',
'︳',
'︴',
'￨',
];
export const metricFences: string[] = ['‖', '∥', '⦀', '⫴'];
/**
 * Array of all fences.
 */
// export const allFences: string[] = neutralFences.concat(
//   leftFences, rightFences, topFences, bottomFences);

// Operator symbols
export const additions: string[] = [
  '+',
  '±',
  '∓',
  '∔',
  '∨',
  '∪',
  '⊌',
  '⊍',
  '⊎',
  '⊔',
  '⊝',
  '⊞',
  '⊻',
  '⋄',
  '⋎',
  '⋓',
  '⊕',
  '✛',
  '✜',
  '➕',
  '﹢',
  '＋',
  '⨹',
  '⨢',
  '⨣',
  '⨤',
  '⨥',
  '⨦',
  '⨧',
  '⨨',
  '⨭',
  '⨮',
'⫝̸',
'⫝',
'⧺',
'⧻',
'⧾',
'⊽',
'⟏',
'⩂',
'⩅',
'⩆',
'⩈',
'⩊',
'⩌',
'⩏',
'⩐',
'⩒',
'⩔',
'⩖',
'⩗',
'⩙',
'⩛',
'⩝',
'⩡',
'⩢',
'⩣',
  '⌄',
];

additions.push(NamedSymbol.invisiblePlus);

export const multiplications: string[] = [
  // conjugate operators (e.g., Hermitian)
  '⊹',
  '†',
  '‡',

  '∗',
  '∘',
  '∙',
  '≀',
  '⊚',
  '⊛',
  '⊠',
  '⊡',
  '⋅',
  '⋆',
  '⋇',
  '⋈',
  '⋉',
  '⋊',
  '⋋',
  '⋌',
  '○',
  '·',
  '*',
  '⁎',
  '⁑',
  '﹡',
  '＊',
  '⊗',
  '⊙',
  '✕',
  '✖',
  '×',
  '⨯',
  '⨰',
  '⨱',
  '⨲',
  '⨳',
  '⨴',
  '⨵',
  '⨶',
  '⨷',
  '⨻',
  '⨼',
  '⨽',
'⨝',
'⧑',
'⧒',
'⧓',
'⧔',
'⧕',
'⧖',
'⧗',
'⧢',
  '⋔',
'⫚',
'⫛',

  '∧',
  '∩',
  '⊓',
  '⊼',
  '⋏',
  '⋒',
  '⩞',
'⌅',
'⌆',
'⟎',
'⟑',
'⩀',
'⩃',
'⩄',
'⩇',
'⩉',
'⩋',
'⩍',
'⩎',
'⩑',
'⩓',
'⩕',
'⩘',
'⩚',
'⩜',
'⩟',
'⩠',
  '⌃',
];
multiplications.push(NamedSymbol.invisibleTimes);

export const subtractions: string[] = [
  '¯',
  '-',
  '⁒',
  '⁻',
  '₋',
  '−',
  '∖',
  '∸',
  '≂',
  '⊖',
  '⊟',
  '➖',
  '⨩',
  '⨪',
  '⨫',
  '⨬',
  '⨺',
  '⩁',
  '﹣',
  '－',
  '‐',
  '‑',
  '⧿',
];
export const divisions: string[] = ['/', '÷', '⁄', '∕', '⊘', '⟌', '⦼', '⨸', '➗',
                             '⧵', '⧶', '⧷', '⧸', '⧹',

];

// Relation symbols
export const equalities: string[] = [
  '=',
  '~',
  '⁼',
  '₌',
  '∼',
  '∽',
  '≃',
  '≅',
  '≈',
  '≊',
  '≋',
  '≌',
  '≍',
  '≎',
  '≑',
  '≒',
  '≓',
  '≔',
  '≕',
  '≖',
  '≗',
  '≘',
  '≙',
  '≚',
  '≛',
  '≜',
  '≝',
  '≞',
  '≟',
  '≡',
  '≣',
  '⧤',
  '⩦',
  '⩮',
  '⩯',
  '⩰',
  '⩱',
  '⩲',
  '⩳',
  '⩴',
  '⩵',
  '⩶',
  '⩷',
  '⩸',
  '⋕',
  '⩭',
  '⩪',
  '⩫',
  '⩬',
  '﹦',
  '＝',
  '⩬',
  '⊜',
  '∷',
  '∺',
'∻',
'∾',
'∿',
'⋍',
'⩧',
  '⧦',
  '∝'
];
export const inequalities: string[] = [
  '<',
  '>',
  '≁',
  '≂',
  '≄',
  '≆',
  '≇',
  '≉',
  '≏',
  '≐',
  '≠',
  '≢',
  '≤',
  '≥',
  '≦',
  '≧',
  '≨',
  '≩',
  '≪',
  '≫',
  '≬',
  '≭',
  '≮',
  '≯',
  '≰',
  '≱',
  '≲',
  '≳',
  '≴',
  '≵',
  '≶',
  '≷',
  '≸',
  '≹',
  '≺',
  '≻',
  '≼',
  '≽',
  '≾',
  '≿',
  '⊀',
  '⊁',
  '⋖',
  '⋗',
  '⋘',
  '⋙',
  '⋚',
  '⋛',
  '⋜',
  '⋝',
  '⋞',
  '⋟',
  '⋠',
  '⋡',
  '⋦',
  '⋧',
  '⋨',
  '⋩',
  '⩹',
  '⩺',
  '⩻',
  '⩼',
  '⩽',
  '⩾',
  '⩿',
  '⪀',
  '⪁',
  '⪂',
  '⪃',
  '⪄',
  '⪅',
  '⪆',
  '⪇',
  '⪈',
  '⪉',
  '⪊',
  '⪋',
  '⪌',
  '⪍',
  '⪎',
  '⪏',
  '⪐',
  '⪑',
  '⪒',
  '⪓',
  '⪔',
  '⪕',
  '⪖',
  '⪗',
  '⪘',
  '⪙',
  '⪚',
  '⪛',
  '⪜',
  '⪝',
  '⪞',
  '⪟',
  '⪠',
  '⪡',
  '⪢',
  '⪣',
  '⪤',
  '⪥',
  '⪦',
  '⪧',
  '⪨',
  '⪩',
  '⪪',
  '⪫',
  '⪬',
  '⪭',
  '⪮',
  '⪯',
  '⪰',
  '⪱',
  '⪲',
  '⪳',
  '⪴',
  '⪵',
  '⪶',
  '⪷',
  '⪸',
  '⪹',
  '⪺',
  '⪻',
  '⪼',
  '⫷',
  '⫸',
  '⫹',
  '⫺',
  '⧀',
  '⧁',
  '﹤',
  '﹥',
  '＜',
  '＞',
  '⥶',
  '⥷',
  '⥸',
'⊰',
'⊱',
'⧣',
'⧥',
'⧡',];
export const setRelations: string[] = [
  '⋢',
  '⋣',
  '⋤',
  '⋥',
  '⊂',
  '⊃',
  '⊄',
  '⊅',
  '⊆',
  '⊇',
  '⊈',
  '⊉',
  '⊊',
  '⊋',
  '⊏',
  '⊐',
  '⊑',
  '⊒',
  '⪽',
  '⪾',
  '⪿',
  '⫀',
  '⫁',
  '⫂',
  '⫃',
  '⫄',
  '⫅',
  '⫆',
  '⫇',
  '⫈',
  '⫉',
  '⫊',
  '⫋',
  '⫌',
  '⫍',
  '⫎',
  '⫏',
  '⫐',
  '⫑',
  '⫒',
  '⫓',
  '⫔',
  '⫕',
  '⫖',
  '⫗',
  '⫘',
  '⋐',
  '⋑',
  '⋪',
  '⋫',
  '⋬',
  '⋭',
  '⊲',
  '⊳',
  '⊴',
  '⊵',
  '⥹',
  '⥺',
  '⥻',
'⟃',
'⟄',
'⟇',
'⟈',
'⟉',
'⊶',
'⊷',
'⊸',
'⟕',
'⟖',
'⟗',
'⟜',
'⧟',
];
export const elementRelations: string[] = [
  '∈',
  '∊',
  '⋲',
  '⋳',
  '⋴',
  '⋵',
  '⋶',
  '⋷',
  '⋸',
  '⋹',
  '⋿',
  '⫙',
'⟒',
];
export const nonelementRelations: string[] = ['∉'];
export const reelementRelations: string[] = ['∋', '∍', '⋺', '⋻', '⋼', '⋽', '⋾'];
export const renonelementRelations: string[] = ['∌'];
export const setEmpty: string[] = ['∅', '⦰', '⦳', '⦱', '⦲', '⦴'];
export const infty: string[] = [
  '⧜',
  '⧝',
  '⧞',
  '∞',
  '᪲'
]
export const logicIdentifier: string[] = [
  '⫟',
  '⫠',
  '⫧',
  '⫨',
  '⫩',
  '⫪',
  '⫫',
'⟘',
'⟙',
'⟟',
'⫱',
  '⊤',
  '⊥',
  '⊺',
];
export const logicRelations: string[] = [
  // TODO (sorge): Add all the other relations. Currently mainly tacks and
  // turnstyles.
  '⊢',
  '⊣',
  '⊦',
  '⊧',
  '⊨',
  '⊩',
  '⊪',
  '⊫',
  '⊬',
  '⊭',
  '⊮',
  '⊯',
  '⫞',
  '⫢',
  '⫣',
  '⫤',
  '⫥',
  '⫦',
  '⫬',
  '⫭',
'⟚',
'⟛',
'⟝',
'⟞',
];
export const arrows: string[] = [
  '←',
  '↑',
  '→',
  '↓',
  '↔',
  '↕',
  '↖',
  '↗',
  '↘',
  '↙',
  '↚',
  '↛',
  '↜',
  '↝',
  '↞',
  '↟',
  '↠',
  '↡',
  '↢',
  '↣',
  '↤',
  '↥',
  '↦',
  '↧',
  '↨',
  '↩',
  '↪',
  '↫',
  '↬',
  '↭',
  '↮',
  '↯',
  '↰',
  '↱',
  '↲',
  '↳',
  '↴',
  '↵',
  '↶',
  '↷',
  '↸',
  '↹',
  '↺',
  '↻',
  '⇄',
  '⇅',
  '⇆',
  '⇇',
  '⇈',
  '⇉',
  '⇊',
  '⇍',
  '⇎',
  '⇏',
  '⇐',
  '⇑',
  '⇒',
  '⇓',
  '⇔',
  '⇕',
  '⇖',
  '⇗',
  '⇘',
  '⇙',
  '⇚',
  '⇛',
  '⇜',
  '⇝',
  '⇞',
  '⇟',
  '⇠',
  '⇡',
  '⇢',
  '⇣',
  '⇤',
  '⇥',
  '⇦',
  '⇧',
  '⇨',
  '⇩',
  '⇪',
  '⇫',
  '⇬',
  '⇭',
  '⇮',
  '⇯',
  '⇰',
  '⇱',
  '⇲',
  '⇳',
  '⇴',
  '⇵',
  '⇶',
  '⇷',
  '⇸',
  '⇹',
  '⇺',
  '⇻',
  '⇼',
  '⇽',
  '⇾',
  '⇿',
  '⌁',
  '⌤',
  '⎋',
  '➔',
  '➘',
  '➙',
  '➚',
  '➛',
  '➜',
  '➝',
  '➞',
  '➟',
  '➠',
  '➡',
  '➢',
  '➣',
  '➤',
  '➥',
  '➦',
  '➧',
  '➨',
  '➩',
  '➪',
  '➫',
  '➬',
  '➭',
  '➮',
  '➯',
  '➱',
  '➲',
  '➳',
  '➴',
  '➵',
  '➶',
  '➷',
  '➸',
  '➹',
  '➺',
  '➻',
  '➼',
  '➽',
  '➾',
  '⟰',
  '⟱',
  '⟲',
  '⟳',
  '⟴',
  '⟵',
  '⟶',
  '⟷',
  '⟸',
  '⟹',
  '⟺',
  '⟻',
  '⟼',
  '⟽',
  '⟾',
  '⟿',
  '⤀',
  '⤁',
  '⤂',
  '⤃',
  '⤄',
  '⤅',
  '⤆',
  '⤇',
  '⤈',
  '⤉',
  '⤊',
  '⤋',
  '⤌',
  '⤍',
  '⤎',
  '⤏',
  '⤐',
  '⤑',
  '⤒',
  '⤓',
  '⤔',
  '⤕',
  '⤖',
  '⤗',
  '⤘',
  '⤙',
  '⤚',
  '⤛',
  '⤜',
  '⤝',
  '⤞',
  '⤟',
  '⤠',
  '⤡',
  '⤢',
  '⤣',
  '⤤',
  '⤥',
  '⤦',
  '⤧',
  '⤨',
  '⤩',
  '⤪',
  '⤭',
  '⤮',
  '⤯',
  '⤰',
  '⤱',
  '⤲',
  '⤳',
  '⤴',
  '⤵',
  '⤶',
  '⤷',
  '⤸',
  '⤹',
  '⤺',
  '⤻',
  '⤼',
  '⤽',
  '⤾',
  '⤿',
  '⥀',
  '⥁',
  '⥂',
  '⥃',
  '⥄',
  '⥅',
  '⥆',
  '⥇',
  '⥈',
  '⥉',
  '⥰',
  '⥱',
  '⥲',
  '⥳',
  '⥴',
  '⥵',
  '⬀',
  '⬁',
  '⬂',
  '⬃',
  '⬄',
  '⬅',
  '⬆',
  '⬇',
  '⬈',
  '⬉',
  '⬊',
  '⬋',
  '⬌',
  '⬍',
  '⬎',
  '⬏',
  '⬐',
  '⬑',
  '⬰',
  '⬱',
  '⬲',
  '⬳',
  '⬴',
  '⬵',
  '⬶',
  '⬷',
  '⬸',
  '⬹',
  '⬺',
  '⬻',
  '⬼',
  '⬽',
  '⬾',
  '⬿',
  '⭀',
  '⭁',
  '⭂',
  '⭃',
  '⭄',
  '⭅',
  '⭆',
  '⭇',
  '⭈',
  '⭉',
  '⭊',
  '⭋',
  '⭌',
  '￩',
  '￪',
  '￫',
  '￬',
  // Harpoons
  '↼',
  '↽',
  '↾',
  '↿',
  '⇀',
  '⇁',
  '⇂',
  '⇃',
  '⇋',
  '⇌',
  '⥊',
  '⥋',
  '⥌',
  '⥍',
  '⥎',
  '⥏',
  '⥐',
  '⥑',
  '⥒',
  '⥓',
  '⥔',
  '⥕',
  '⥖',
  '⥗',
  '⥘',
  '⥙',
  '⥚',
  '⥛',
  '⥜',
  '⥝',
  '⥞',
  '⥟',
  '⥠',
  '⥡',
  '⥢',
  '⥣',
  '⥤',
  '⥥',
  '⥦',
  '⥧',
  '⥨',
  '⥩',
  '⥪',
  '⥫',
  '⥬',
  '⥭',
  '⥮',
  '⥯',
  '⥼',
  '⥽',
  '⥾',
  '⥿'
];
export const relations: string[] = [
  '∶',
  '⟠',
'⟡',
'⟢',
'⟣',
'⟤',
'⟥',
'⤫',
'⤬',
'⦵',
'⦶',
'⦷',
'⦸',
'⦹',
'⦺',
'⦻',
'⦾',
'⦿',
'⧂',
'⧃',
'⧄',
'⧅',
'⧆',
'⧇',
'⧈',
'⧉',
'⧊',
'⧋',
'⧌',
'⧍',
'⧎',
'⧏',
  '⧐'
];

export const operators: string[] = [
'∤',
'∦',
'∹',
'➰',
'➿',
'⟂',
'⟊',
  '⫡',
'⟋',
'⟍',
'⩤',
'⩥',
'⩨',
'⩩',
'⫮',
'⫯',
'⫰',
'⫲',
'⫳',
'⫵',
'⫶',
'⫻',
'⫽',
'⌇',
'⟁',
'⟐',
'⟓',
'⟔',
'⦁',
'⦙',
'⦚',
'⧧',
'⧴',
'⨠',
'⨡',
]

// Big operation symbols
export const sumOps: string[] = [
  '⅀', // double struck
  '∏',
  '∐',
  '∑',
  '⋀',
  '⋁',
  '⋂',
  '⋃',
  '⨀',
  '⨁',
  '⨂',
  '⨃',
  '⨄',
  '⨅',
  '⨆',
  '⨇',
  '⨈',
  '⨉',
  '⨊',
  '⨋',
  '⫼',
  '⫿',
  '⨿'
];
export const intOps: string[] = [
  '∫',
  '∬',
  '∭',
  '∮',
  '∯',
  '∰',
  '∱',
  '∲',
  '∳',
  '⨌',
  '⨍',
  '⨎',
  '⨏',
  '⨗',
  '⨐',
  '⨑',
  '⨒',
  '⨓',
  '⨔',
  '⨕',
  '⨖',
  '⨗',
  '⨘',
  '⨙',
  '⨚',
  '⨛',
  '⨜'
];
// Angles!
export const angles: string[] = [
  '∟',
  '∠',
  '∡',
  '∢',
  '⊾',
  '⊿',
  '⍼',
'⟀',
'⦛',
'⦜',
'⦝',
'⦞',
'⦟',
'⦠',
'⦡',
'⦢',
'⦣',
'⦤',
'⦥',
'⦦',
'⦧',
'⦨',
'⦩',
'⦪',
'⦫',
'⦬',
'⦭',
'⦮',
  '⦯',
'⌒',
'⌓',
  '⌔',

];

export const geometryOps = [
  // TODO: Add the entire geometric shape set programmatically.
  '⦽',
  '⧪',
  '⧬',
  '⧭',
'⧨',
'⧩',
'⧫',
'⧮',
'⧯',
'⧰',
'⧱',
'⧲',
'⧳',
'∎',
'⌀',
'⌂',
'⧠',
'⨞',
'⫾',
'￭',
'￮',
'⌑',
];

export const operatorBits: string[] =
  // TODO (sorge) What to do if single glyphs of big ops occur on their own.
  //  Maybe distribute them into integral/largeop/roots.
  ['⌠', '⌡', '⎶', '⎪', '⎮', '⎯', '⎲', '⎳', '⎷'];

export const arbitraryChars = [
  '🄪',
  '🄫',
  '🄬',
  '🆊',
  'ℏ',
  '℔',
  '№',
  '℗',
  '℞',
  '℟',
  '℠',
  '℡',
  '™',
  '℮',
  'Ⅎ',
  'ℹ',
  '℺',
  '℻',
  '⅁',
  '⅂',
  '⅃',
  '⅄',
  '©',
  '®',
  '⅍',
  'ⅎ'
];

export const units = [
  '℣',
  '℥',
  'Ω',
  '℧',
  'K',
  'Å',
  '$',
  '¢',
  '£',
  '¤',
  '¥',
  'µ',
  '﹩',
  '＄',
  '￠',
  '￡',
  '￥',
  '￦',
]

/**
 * Array of all number symbols.
 */
// export const allNumbers: string[] = digits.concat(numbers, otherNumbers);

// Functions.
export const trigonometricFunctions: string[] = [
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
  'arctan',
  'arc cos',
  'arc cot',
  'arc csc',
  'arc sec',
  'arc sin',
  'arc tan'
];
export const hyperbolicFunctions: string[] = [
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
  'artanh',
  'arccosh',
  'arccoth',
  'arccsch',
  'arcsech',
  'arcsinh',
  'arctanh'
];
export const algebraicFunctions: string[] = [
  'deg',
  'det',
  'dim',
  'hom',
  'ker',
  'Tr',
  'tr'
];
export const elementaryFunctions: string[] = [
  'log',
  'ln',
  'lg',
  'exp',
  'expt',
  'gcd',
  'gcd',
  'arg',
  'im',
  're',
  'Pr'
];
/**
 * All predefined prefix functions.
 */
export const prefixFunctions: string[] = trigonometricFunctions.concat(
  hyperbolicFunctions,
  algebraicFunctions,
  elementaryFunctions
);

/**
 * Limit functions are handled separately as they can have lower (and upper)
 * limiting expressions.
 */
const limitFunctions: string[] = [
  'inf',
  'lim',
  'liminf',
  'limsup',
  'max',
  'min',
  'sup',
  'injlim',
  'projlim',
  'inj lim',
  'proj lim'
];
const infixFunctions: string[] = ['mod', 'rem'];

interface MeaningSet {
  set: string[];
  role: SemanticRole;
  type: SemanticType;
  font?: SemanticFont;
  secondary?: SemanticSecondary;
}

/**
 * Default assignments of semantic attributes.
 * Assigns sets of symbols to meaning.
 */
const symbolSetToSemantic_: MeaningSet[] = [
  // Punctuation
  {
    set: generalPunctuations,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.UNKNOWN
  },
  {
    set: quotes,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.QUOTES
  },
  {
    set: semicolons,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.SEMICOLON
  },
  {
    set: questionmarks,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.QUESTION
  },
  {
    set: exclamationmarks,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.EXCLAMATION
  },
  {
    set: overaccents,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.OVERACCENT
  },
  {
    set: underaccents,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.UNDERACCENT
  },
  {
    set: colons,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.COLON
  },
  {
    set: commas,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.COMMA
  },
  {
    set: ellipses,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.ELLIPSIS
  },
  {
    set: fullStops,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.FULLSTOP
  },
  {
    set: dashes,
    type: SemanticType.OPERATOR,
    role: SemanticRole.DASH,
    secondary: SemanticSecondary.BAR
  },
  {
    set: tildes,
    type: SemanticType.OPERATOR,
    role: SemanticRole.TILDE,
    secondary: SemanticSecondary.TILDE
  },
  {
    set: primes,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.PRIME
  },
  {
    set: degrees,
    type: SemanticType.PUNCTUATION,
    role: SemanticRole.DEGREE
  },
  // Fences
  {
    set: leftFences,
    type: SemanticType.FENCE,
    role: SemanticRole.OPEN
  },
  {
    set: rightFences,
    type: SemanticType.FENCE,
    role: SemanticRole.CLOSE
  },
  {
    set: topFences,
    type: SemanticType.FENCE,
    role: SemanticRole.TOP
  },
  {
    set: bottomFences,
    type: SemanticType.FENCE,
    role: SemanticRole.BOTTOM
  },
  {
    set: neutralFences,
    type: SemanticType.FENCE,
    role: SemanticRole.NEUTRAL
  },
  {
    set: metricFences,
    type: SemanticType.FENCE,
    role: SemanticRole.METRIC
  },
  // Latin rest characters
  {
    set: Alphabet.makeMultiInterval([ [ '2145', '2149' ] ]),
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.LATINLETTER,
    font: SemanticFont.DOUBLESTRUCKITALIC,
    secondary: SemanticSecondary.ALLLETTERS
  },
  // Greek rest characters.
  {
    set: Alphabet.makeMultiInterval([ [ '213c', '213f' ] ]),
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.GREEKLETTER,
    font: SemanticFont.DOUBLESTRUCK,
    secondary: SemanticSecondary.ALLLETTERS
  },
  {
    set: Alphabet.makeMultiInterval(
      ['3d0', '3d7', '3f6', [ '1d26', '1d2a' ], '1d5e',
       '1d60', [ '1d66', '1d6a' ]]),
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.GREEKLETTER,
    font: SemanticFont.NORMAL,
    secondary: SemanticSecondary.ALLLETTERS
  },
  // Other alphabets.
  {
    set: Alphabet.makeMultiInterval([ [ '2135', '2138' ] ]),
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.OTHERLETTER,
    font: SemanticFont.NORMAL,
    secondary: SemanticSecondary.ALLLETTERS
  },
  // Numbers.
  {
    set: Alphabet.makeMultiInterval([ [ '00bc', '00be' ], [ '2150', '215f' ], '2189' ]),
    type: SemanticType.NUMBER,
    role: SemanticRole.FLOAT
  },
  {
    set: Alphabet.makeMultiInterval([ '23E8', [ '3248', '324f' ] ]),
    type: SemanticType.NUMBER,
    role: SemanticRole.INTEGER
  },
  // Operators.
  {
    set: additions,
    type: SemanticType.OPERATOR,
    role: SemanticRole.ADDITION
  },
  {
    set: multiplications,
    type: SemanticType.OPERATOR,
    role: SemanticRole.MULTIPLICATION
  },
  {
    set: subtractions,
    type: SemanticType.OPERATOR,
    role: SemanticRole.SUBTRACTION
  },
  {
    set: divisions,
    type: SemanticType.OPERATOR,
    role: SemanticRole.DIVISION
  },
  {
    set: ['∀', '∃', '∆', '∁', '∄', '√', '∛', '∜',
'¬',
'￢',
'⌐',
         ],
    type: SemanticType.OPERATOR,
    role: SemanticRole.PREFIXOP
  },
  {
    set: operatorBits,
    type: SemanticType.OPERATOR,
    role: SemanticRole.PREFIXOP
  },
  {
    set: ['𝟊', '𝟋'],
    type: SemanticType.OPERATOR,
    role: SemanticRole.PREFIXOP,
    font: SemanticFont.BOLD
  },
  // Relations
  {
    set: equalities,
    type: SemanticType.RELATION,
    role: SemanticRole.EQUALITY
  },
  {
    set: inequalities,
    type: SemanticType.RELATION,
    role: SemanticRole.INEQUALITY
  },
  {
    set: setRelations,
    type: SemanticType.RELATION,
    role: SemanticRole.SET
  },
  {
    set: relations,
    type: SemanticType.RELATION,
    role: SemanticRole.UNKNOWN
  },
  {
    set: setEmpty,
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.SETEMPTY
  },
  {
    set: infty,
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.INFTY
  },
  {
    set: logicRelations,
    type: SemanticType.RELATION,
    role: SemanticRole.LOGIC
  },
  {
    set: logicIdentifier,
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.LOGIC
  },
  {
    set: arrows,
    type: SemanticType.RELATION,
    role: SemanticRole.ARROW
  },
  // Membership. Currently treated as operator.
  {
    set: elementRelations,
    type: SemanticType.OPERATOR,
    role: SemanticRole.ELEMENT
  },
  {
    set: nonelementRelations,
    type: SemanticType.OPERATOR,
    role: SemanticRole.NONELEMENT
  },
  {
    set: reelementRelations,
    type: SemanticType.OPERATOR,
    role: SemanticRole.REELEMENT
  },
  {
    set: renonelementRelations,
    type: SemanticType.OPERATOR,
    role: SemanticRole.RENONELEMENT
  },
  // Large operators
  {
    set: sumOps,
    type: SemanticType.LARGEOP,
    role: SemanticRole.SUM
  },
  {
    set: intOps,
    type: SemanticType.LARGEOP,
    role: SemanticRole.INTEGRAL
  },
  {
    set: Alphabet.makeMultiInterval([['2500', '257F']]),
    type: SemanticType.RELATION,
    role: SemanticRole.BOX
  },
  {
    set: Alphabet.makeMultiInterval([['2580', '259F']]),
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.BLOCK
  },
  {
    set: Alphabet.makeMultiInterval([['25A0', '25FF'], ['2B12', '2B2F'], ['2B50', '2B59']]),
    type: SemanticType.RELATION,
    role: SemanticRole.GEOMETRY
  },
  {
    set: geometryOps, // TODO: Change that after speech rule work?
    type: SemanticType.OPERATOR,
    role: SemanticRole.GEOMETRY
  },
  {
    set: angles, // TODO: Change that after speech rule work?
    type: SemanticType.OPERATOR,
    role: SemanticRole.GEOMETRY
  },
  // Extra letter symbols (other letters)
  {
    set: arbitraryChars,
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.OTHERLETTER
  },
  // Units
  //
  // (Can't give role unit as otherwise string notation like $a4f would not
  // work)
  {
    set: units,
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.UNKNOWN
  },
  // Functions
  {
    set: limitFunctions,
    type: SemanticType.FUNCTION,
    role: SemanticRole.LIMFUNC
  },
  {
    set: prefixFunctions,
    type: SemanticType.FUNCTION,
    role: SemanticRole.PREFIXFUNC
  },
  {
    set: infixFunctions,
    type: SemanticType.OPERATOR,
    role: SemanticRole.PREFIXFUNC
  },
  // Remaining Latin Characters
  // TODO: Move these elsewhere.
  // dotless i and j.
  {
    set: ['ı', 'ȷ'],
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.LATINLETTER,
    font: SemanticFont.NORMAL
  },
  // dotless i and j.
  {
    set: ['𝚤', '𝚥'],
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.LATINLETTER,
    font: SemanticFont.ITALIC
  },
  // script small l
  // Powerset Cap P.
  {
    set: ['ℓ', '℘'],
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.LATINLETTER,
    font: SemanticFont.SCRIPT
  },
  {
    set: Alphabet.makeMultiInterval(
      [
        // Extended Latin with accents
        ['c0', 'd6'], ['d8', 'f6'], ['f8', '1bf'], ['1c4', '2af'],
        // Latin phonetic alphabets
        ['1d00', '1d25'], ['1d6b', '1d9a'], ['1e00', '1ef9'],
        // Latin combining superscripts
        [ '363', '36f' ], [ '1dd3', '1de6' ],
        // Latin combining subscripts
        [ '1d62', '1d65' ], '1dca',
        // Latin superscripts
        '2071', '207f',
        // Latin subscripts
        [ '2090', '209c'], '2c7c'
      ]),
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.LATINLETTER,
    font: SemanticFont.NORMAL
  },
  // Remaining Symbols
  {
    set: operators,
    type: SemanticType.OPERATOR,
    role: SemanticRole.UNKNOWN
  },
  {
    set: Alphabet.makeMultiInterval(
      ['2605', '2606', '26aa', '26ab',
       ['2720', '274d']]),
    type: SemanticType.OPERATOR,
    role: SemanticRole.UNKNOWN
  },
  // TODO: Checkmarks. Might need their own role.
  {
    set: Alphabet.makeMultiInterval([['214A', '214C'], '2705', '2713', '2714', '2717', '2718']),
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.UNKNOWN
  },
  // Spaces
  {
    set: Alphabet.makeMultiInterval(
      ['20', 'a0', 'ad', [ '2000', '200f' ], [ '2028', '202f' ],
       [ '205f', '2060' ], '206a', '206b', '206e', '206f', 'feff',
       [ 'fff9', 'fffb' ]]),
    type: SemanticType.TEXT,
    role: SemanticRole.SPACE
  }
];

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

// /**
//  * Lookup the semantic type of a symbol.
//  *
//  * @param symbol The symbol to which we want to determine the type.
//  * @returns The semantic type of the symbol.
//  */
// export function lookupType(symbol: string): SemanticType {
//   return meaning_[symbol]?.type || SemanticType.UNKNOWN;
// }

// /**
//  * Lookup the semantic role of a symbol.
//  *
//  * @param symbol The symbol to which we want to determine the role.
//  * @returns The semantic role of the symbol.
//  */
// export function lookupRole(symbol: string): SemanticRole {
//   return meaning_[symbol]?.role || SemanticRole.UNKNOWN;
// }

/**
 * Lookup the semantic meaning of a symbol in terms of type and role.
 *
 * @param symbol The symbol to which we want to determine the meaning.
 * @returns The semantic meaning of the symbol.
 */
export function lookupMeaning(symbol: string): SemanticMeaning {
  return (
    meaning_.get(symbol) || {
      role: SemanticRole.UNKNOWN,
      type: SemanticType.UNKNOWN,
      font: SemanticFont.UNKNOWN
    }
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
  if (neutralFences.indexOf(open) !== -1 || metricFences.indexOf(open) !== -1) {
    return open === close;
  }
  return openClosePairs[open] === close || topBottomPairs[open] === close;
}

/**
 * Initializes the dictionary mapping strings to meaning.
 *
 * @returns The dictionary mapping strings to
 *     semantic attributes.
 */
function initMeaning() {
  for (let i = 0, st: MeaningSet; (st = symbolSetToSemantic_[i]); i++) {
    st.set.forEach(function (symbol) {
      meaning_.set(symbol, {
        role: st.role || SemanticRole.UNKNOWN,
        type: st.type || SemanticType.UNKNOWN,
        font: st.font || SemanticFont.UNKNOWN
      });
      if (st.secondary) {
        SemanticMap.Secondary.set(st.secondary, symbol);
      }
    });
  }
};
initMeaning();

/**
 * ORDERING:
 * * Create alphabets/numerals
 * * Add other semantics for single letters: position, meaning
 * * Add to regexp (e.g. all letters)
 * * Add secondary meaning: secondary string, position
 */

function changeSemantics(alphabet: string[], change: {[position: number]: SemanticMeaning}) {
  for (let [pos, meaning] of Object.entries(change)) {
    let character = alphabet[pos as unknown as number];
    if (character !== undefined) {
      meaning_.set(character, meaning);
    }
  }
}

function addSecondaries(alphabet: string[], change: {[position: number]: SemanticSecondary}) {
  for (let [pos, meaning] of Object.entries(change)) {
    let character = alphabet[pos as unknown as number];
    if (character !== undefined) {
      SemanticMap.Secondary.set(meaning, character)
    }
  }
}

function singleAlphabet(alphabet: Alphabet.Base, type: SemanticType,
                        role: SemanticRole, font: SemanticFont,
                        semfont: SemanticFont,
                        secondaries: SemanticSecondary[] = [],
                        change: {[position: number]: SemanticMeaning} = {},
                        secondary: {[position: number]: SemanticSecondary} = {}) {
  let interval = Alphabet.INTERVALS.get(Alphabet.alphabetName(alphabet, font));
  if (interval) {
    interval.unicode.forEach(x => {
      meaning_.set(x, {
        type: type,
        role: role,
        font: semfont
      });
      secondaries.forEach(sec => SemanticMap.Secondary.set(sec, x));
    });
    changeSemantics(interval.unicode, change);
    addSecondaries(interval.unicode, secondary);
  }
}

function alphabets() {
  for (let [name, font] of Object.entries(SemanticFont)) {
    let emb = !!(Alphabet as any).Embellish[name];
    let semfont = emb ? SemanticFont.UNKNOWN : (font === SemanticFont.FULLWIDTH ? SemanticFont.NORMAL : font);
    singleAlphabet(Alphabet.Base.LATINCAP, SemanticType.IDENTIFIER, SemanticRole.LATINLETTER, font, semfont, [SemanticSecondary.ALLLETTERS]);
    singleAlphabet(Alphabet.Base.LATINSMALL, SemanticType.IDENTIFIER, SemanticRole.LATINLETTER, font, semfont, [SemanticSecondary.ALLLETTERS], {},
                   {3: SemanticSecondary.D});
    singleAlphabet(Alphabet.Base.GREEKCAP, SemanticType.IDENTIFIER, SemanticRole.GREEKLETTER, font, semfont, [SemanticSecondary.ALLLETTERS]);
    singleAlphabet(Alphabet.Base.GREEKSMALL, SemanticType.IDENTIFIER, SemanticRole.GREEKLETTER, font, semfont, [SemanticSecondary.ALLLETTERS],
                   {0: {type: SemanticType.OPERATOR,
                        role: SemanticRole.PREFIXOP,
                        font: semfont},
                    26: {type: SemanticType.OPERATOR,
                        role: SemanticRole.PREFIXOP,
                        font: semfont}
                   });
    singleAlphabet(Alphabet.Base.DIGIT, SemanticType.NUMBER, SemanticRole.INTEGER, font, semfont);
  }
}
alphabets();

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

/**
 * Contains the basic mappings of characters/symbols and functions to semantic
 * attributes.
 *
 * Observe that all characters are given as hex code number in order to ease the
 * comparison with those in the JSON files that define speech rules per
 * character.
 */
// Punctuation Characters.
const generalPunctuations: string[] = [
  '!',
  '"',
  '#',
  '%',
  '&',
  ';',
  '?',
  '@',
  '\\',
  '¡',
  '§',
  '¶',
  '¿',
  '‗',
  '†',
  '‡',
  '•',
  '‣',
  '․',
  '‥',
  '‧',
  '‰',
  '‱',
  '‸',
  '※',
  '‼',
  '‽',
  '‾',
  '⁁',
  '⁂',
  '⁃',
  '⁇',
  '⁈',
  '⁉',
  '⁋',
  '⁌',
  '⁍',
  '⁎',
  '⁏',
  '⁐',
  '⁑',
  '⁓',
  '⁕',
  '⁖',
  '⁘',
  '⁙',
  '⁚',
  '⁛',
  '⁜',
  '⁝',
  '⁞',
  '︐',
  '︔',
  '︕',
  '︖',
  '︰',
  '﹅',
  '﹆',
  '﹉',
  '﹊',
  '﹋',
  '﹌',
  '﹔',
  '﹖',
  '﹗',
  '﹟',
  '﹠',
  '﹡',
  '﹨',
  '﹪',
  '﹫',
  '！',
  '＂',
  '＃',
  '％',
  '＆',
  '＇',
  '＊',
  '／',
  '；',
  '？',
  '＠',
  '＼'
];
const colons: string[] = ['︓', ':', '：', '﹕'];
const invisibleComma_: string = String.fromCodePoint(0x2063);
const commas: string[] = ['，', '﹐', ',', invisibleComma_];
const ellipses: string[] = ['…', '⋮', '⋯', '⋰', '⋱', '︙'];
const fullStops: string[] = ['.', '﹒', '．'];
const dashes: string[] = [
  '¯',
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
  '_'
];
const tildes: string[] = ['~', '̃', '∼', '˜', '∽', '˷', '̴', '̰'];
const primes: string[] = ["'", '′', '″', '‴', '‵', '‶', '‷', '⁗', 'ʹ', 'ʺ'];
const degrees: string[] = ['°'];

// Fences.
// Fences are treated slightly differently from other symbols as we want to
// record pairs of opening/closing and top/bottom fences.
/**
 * Mapping opening to closing fences.
 */
const openClosePairs: { [key: string]: string } = {
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
const topBottomPairs: { [key: string]: string } = {
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

const leftFences: string[] = Object.keys(openClosePairs);
const rightFences: string[] = Object.values(openClosePairs);
rightFences.push('〟');
const topFences: string[] = Object.keys(topBottomPairs);
const bottomFences: string[] = Object.values(topBottomPairs);

const neutralFences: string[] = [
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
  '︲'
];
const metricFences: string[] = ['‖', '∥', '⦀', '⫴'];
/**
 * Array of all fences.
 */
// const allFences: string[] = neutralFences.concat(
//   leftFences, rightFences, topFences, bottomFences);

// Identifiers.
const latinDoubleStruckItalic: string[] = ['ⅅ', 'ⅆ', 'ⅇ', 'ⅈ', 'ⅉ'];

const greekDoubleStruck: string[] = ['ℼ', 'ℽ', 'ℾ', 'ℿ'];
const greekSpecial: string[] = ['ϐ', 'ϗ', '϶'];

// Other alphabets.
const hebrewLetters: string[] = ['ℵ', 'ℶ', 'ℷ', 'ℸ'];

// Operator symbols
const additions: string[] = [
  '+',
  '±',
  '∓',
  '∔',
  '∧',
  '∨',
  '∩',
  '∪',
  '⊌',
  '⊍',
  '⊎',
  '⊓',
  '⊔',
  '⊝',
  '⊞',
  '⊤',
  '⊥',
  '⊺',
  '⊻',
  '⊼',
  '⋄',
  '⋎',
  '⋏',
  '⋒',
  '⋓',
  '⩞',
  '⊕',
  '⋔'
];

/**
 * Invisible operator for plus.
 */
const invisiblePlus_: string = String.fromCodePoint(0x2064);
additions.push(invisiblePlus_);

const multiplications: string[] = [
  '†',
  '‡',
  '∐',
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
  '⊗',
  '⊙'
];
/**
 * Invisible operator for multiplication.
 */
const invisibleTimes_: string = String.fromCodePoint(0x2062);
multiplications.push(invisibleTimes_);

const subtractions: string[] = [
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
  '‑'
];
const divisions: string[] = ['/', '÷', '⁄', '∕', '⊘', '⟌', '⦼', '⨸'];
/**
 * Invisible operator for function application.
 */
const functionApplication_: string = String.fromCodePoint(0x2061);

// Relation symbols
const equalities: string[] = [
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
  '∷'
];
const inequalities: string[] = [
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
  '＞'
];
const setRelations: string[] = [
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
  '⊵'
];
const elementRelations: string[] = [
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
  '⋿'
];
const nonelementRelations: string[] = ['∉'];
const reelementRelations: string[] = ['∋', '∍', '⋺', '⋻', '⋼', '⋽', '⋾'];
const renonelementRelations: string[] = ['∌'];
const relations: string[] = [
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
  '⫟',
  '⫠',
  '⫡',
  '⫢',
  '⫣',
  '⫤',
  '⫥',
  '⫦',
  '⫧',
  '⫨',
  '⫩',
  '⫪',
  '⫫',
  '⫬',
  '⫭'
];
const arrows: string[] = [
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
  '⌃',
  '⌄',
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
  '⥶',
  '⥷',
  '⥸',
  '⥹',
  '⥺',
  '⥻',
  '⦳',
  '⦴',
  '⦽',
  '⧪',
  '⧬',
  '⧭',
  '⨗',
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

// Big operation symbols
const sumOps: string[] = [
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
  '⫿'
];
const intOps: string[] = [
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
const geometryOps: string[] = [
  '∟',
  '∠',
  '∡',
  '∢',
  '⊾',
  '⊿',
  // TODO: Add the entire geometric shape set programmatically.
  '△',
  '▷',
  '▽',
  '◁'
];
const prefixOps: string[] = ['∀', '∃', '∆', '∁', '∄'];
const prefixOpsBold: string[] = ['𝛁', '𝛛', '𝟊', '𝟋'];
const prefixOpsItalic: string[] = ['𝛻', '𝜕'];
const prefixOpsSansSerifBold: string[] = ['𝝯', '𝞉'];
// TODO (sorge) Insert nabla, differential operators sans serif bold italic

// const operatorBits: string[] =
//     // TODO (sorge) What to do if single glyphs of big ops occur on their own.
//     ['⌠', '⌡', '⎶', '⎪', '⎮', '⎯', '⎲', '⎳', '⎷'];

// Accents.
// TODO (sorge) Add accented characters.

// Numbers.
// Digits.
const digitsSuperscript: string[] = [
  '²',
  '³',
  '¹',
  '⁰',
  '⁴',
  '⁵',
  '⁶',
  '⁷',
  '⁸',
  '⁹'
];
const digitsSubscript: string[] = [
  '₀',
  '₁',
  '₂',
  '₃',
  '₄',
  '₅',
  '₆',
  '₇',
  '₈',
  '₉'
];
const fractions: string[] = [
  '¼',
  '½',
  '¾',
  '⅐',
  '⅑',
  '⅒',
  '⅓',
  '⅔',
  '⅕',
  '⅖',
  '⅗',
  '⅘',
  '⅙',
  '⅚',
  '⅛',
  '⅜',
  '⅝',
  '⅞',
  '⅟',
  '↉'
];
const enclosedNumbers: string[] =
  // Encircled numbers.
  [
    '①',
    '②',
    '③',
    '④',
    '⑤',
    '⑥',
    '⑦',
    '⑧',
    '⑨',
    '⑩',
    '⑪',
    '⑫',
    '⑬',
    '⑭',
    '⑮',
    '⑯',
    '⑰',
    '⑱',
    '⑲',
    '⑳',
    '⓪',
    '⓫',
    '⓬',
    '⓭',
    '⓮',
    '⓯',
    '⓰',
    '⓱',
    '⓲',
    '⓳',
    '⓴',
    '⓵',
    '⓶',
    '⓷',
    '⓸',
    '⓹',
    '⓺',
    '⓻',
    '⓼',
    '⓽',
    '⓾',
    '⓿',
    '❶',
    '❷',
    '❸',
    '❹',
    '❺',
    '❻',
    '❼',
    '❽',
    '❾',
    '❿',
    '➀',
    '➁',
    '➂',
    '➃',
    '➄',
    '➅',
    '➆',
    '➇',
    '➈',
    '➉',
    '➊',
    '➋',
    '➌',
    '➍',
    '➎',
    '➏',
    '➐',
    '➑',
    '➒',
    '➓',
    '㉈',
    '㉉',
    '㉊',
    '㉋',
    '㉌',
    '㉍',
    '㉎',
    '㉏',
    '㉑',
    '㉒',
    '㉓',
    '㉔',
    '㉕',
    '㉖',
    '㉗',
    '㉘',
    '㉙',
    '㉚',
    '㉛',
    '㉜',
    '㉝',
    '㉞',
    '㉟',
    '㊱',
    '㊲',
    '㊳',
    '㊴',
    '㊵',
    '㊶',
    '㊷',
    '㊸',
    '㊹',
    '㊺',
    '㊻',
    '㊼',
    '㊽',
    '㊾',
    '㊿'
  ];
const fencedNumbers: string[] =
  // Numbers in Parenthesis.
  [
    '⑴',
    '⑵',
    '⑶',
    '⑷',
    '⑸',
    '⑹',
    '⑺',
    '⑻',
    '⑼',
    '⑽',
    '⑾',
    '⑿',
    '⒀',
    '⒁',
    '⒂',
    '⒃',
    '⒄',
    '⒅',
    '⒆',
    '⒇'
  ];
const punctuatedNumbers: string[] =
  // Numbers with other punctuation.
  [
    '⒈',
    '⒉',
    '⒊',
    '⒋',
    '⒌',
    '⒍',
    '⒎',
    '⒏',
    '⒐',
    '⒑',
    '⒒',
    '⒓',
    '⒔',
    '⒕',
    '⒖',
    '⒗',
    '⒘',
    '⒙',
    '⒚',
    '⒛', // full stop.
    '🄀',
    '🄁',
    '🄂',
    '🄃',
    '🄄',
    '🄅',
    '🄆',
    '🄇',
    '🄈',
    '🄉',
    '🄊' // comma.
  ];
/**
 * Array of all single digits.
 */
// const digits: string[] = digitsNormal.concat(
//       digitsFullWidth, digitsBold, digitsDoubleStruck,
//       digitsSansSerif, digitsSansSerifBold, digitsMonospace);
/**
 * Array of all non-digit number symbols.
 */
const numbers: string[] = fractions;
const otherNumbers: string[] = digitsSuperscript.concat(
  digitsSubscript,
  enclosedNumbers,
  fencedNumbers,
  punctuatedNumbers
);

/**
 * Array of all number symbols.
 */
// const allNumbers: string[] = digits.concat(numbers, otherNumbers);

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
  'arctan',
  'arc cos',
  'arc cot',
  'arc csc',
  'arc sec',
  'arc sin',
  'arc tan'
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
  'artanh',
  'arccosh',
  'arccoth',
  'arccsch',
  'arcsech',
  'arcsinh',
  'arctanh'
];
const algebraicFunctions: string[] = [
  'deg',
  'det',
  'dim',
  'hom',
  'ker',
  'Tr',
  'tr'
];
const elementaryFunctions: string[] = [
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
const prefixFunctions: string[] = trigonometricFunctions.concat(
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
    role: SemanticRole.DASH
  },
  {
    set: tildes,
    type: SemanticType.OPERATOR,
    role: SemanticRole.TILDE
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
    set: latinDoubleStruckItalic,
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.LATINLETTER,
    font: SemanticFont.DOUBLESTRUCKITALIC,
    secondary: SemanticSecondary.ALLLETTERS
  },
  // Greek rest characters.
  {
    set: greekDoubleStruck,
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.GREEKLETTER,
    font: SemanticFont.DOUBLESTRUCK,
    secondary: SemanticSecondary.ALLLETTERS
  },
  {
    set: greekSpecial,
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.GREEKLETTER,
    font: SemanticFont.NORMAL,
    secondary: SemanticSecondary.ALLLETTERS
  },
  // Other alphabets.
  {
    set: hebrewLetters,
    type: SemanticType.IDENTIFIER,
    role: SemanticRole.OTHERLETTER,
    font: SemanticFont.NORMAL,
    secondary: SemanticSecondary.ALLLETTERS
  },
  // Numbers.
  {
    set: numbers,
    type: SemanticType.NUMBER,
    role: SemanticRole.FLOAT
  },
  {
    set: otherNumbers,
    type: SemanticType.NUMBER,
    role: SemanticRole.OTHERNUMBER
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
    set: prefixOps,
    type: SemanticType.OPERATOR,
    role: SemanticRole.PREFIXOP
  },
  {
    set: prefixOpsBold,
    type: SemanticType.OPERATOR,
    role: SemanticRole.PREFIXOP,
    font: SemanticFont.BOLD
  },
  {
    set: prefixOpsItalic,
    type: SemanticType.OPERATOR,
    role: SemanticRole.PREFIXOP,
    font: SemanticFont.ITALIC
  },
  {
    set: prefixOpsSansSerifBold,
    type: SemanticType.OPERATOR,
    role: SemanticRole.PREFIXOP,
    font: SemanticFont.SANSSERIFBOLD
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
    set: geometryOps, // TODO: Change that after speech rule work?
    type: SemanticType.OPERATOR,
    role: SemanticRole.GEOMETRY
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

/**
 * Lookup the semantic type of a symbol.
 *
 * @param symbol The symbol to which we want to determine the type.
 * @returns The semantic type of the symbol.
 */
export function lookupType(symbol: string): SemanticType {
  return meaning_[symbol]?.type || SemanticType.UNKNOWN;
}

/**
 * Lookup the semantic role of a symbol.
 *
 * @param symbol The symbol to which we want to determine the role.
 * @returns The semantic role of the symbol.
 */
export function lookupRole(symbol: string): SemanticRole {
  return meaning_[symbol]?.role || SemanticRole.UNKNOWN;
}

/**
 * Lookup the semantic meaning of a symbol in terms of type and role.
 *
 * @param symbol The symbol to which we want to determine the meaning.
 * @returns The semantic meaning of the symbol.
 */
export function lookupMeaning(symbol: string): SemanticMeaning {
  return (
    meaning_[symbol] || {
      role: SemanticRole.UNKNOWN,
      type: SemanticType.UNKNOWN,
      font: SemanticFont.UNKNOWN
    }
  );
}

/**
 * String representation of the invisible times unicode character.
 *
 * @returns The invisible times character.
 */
export function invisibleTimes(): string {
  return invisibleTimes_;
}

/**
 * String representation of the invisible plus unicode character.
 *
 * @returns The invisible plus character.
 */
export function invisiblePlus(): string {
  return invisiblePlus_;
}

/**
 * String representation of the invisible comma unicode character.
 *
 * @returns The invisible comma character.
 */
export function invisibleComma(): string {
  return invisibleComma_;
}

/**
 * String representation of the function application character.
 *
 * @returns The invisible function application character.
 */
export function functionApplication(): string {
  return functionApplication_;
}

// /**
//  * Decide when two fences match. Currently we match any right to left
//  * or bottom to top fence and neutral to neutral.
//  * @param open Opening fence.
//  * @param close Closing fence.
//  * @return True if the fences are matching.
//  */
// export function isMatchingFenceRole(open: string, close: string): boolean {
//   return open === SemanticRole.OPEN &&
//     close === SemanticRole.CLOSE ||
//     isNeutralFence(open) && isNeutralFence(close) ||
//     open === SemanticRole.TOP && close === SemanticRole.BOTTOM;
// }

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

// /**
//  * Determines if a fence is an opening fence.
//  * @param fence Opening fence.
//  * @return True if the fence is open or neutral.
//  */
// export function isOpeningFence(fence: SemanticRole): boolean {
//   return fence === SemanticRole.OPEN || isNeutralFence(fence);
// }

// /**
//  * Determines if a fence is a closing fence.
//  * @param fence Closing fence.
//  * @return True if the fence is close or neutral.
//  */
// export function isClosingFence(fence: SemanticRole): boolean {
//   return fence === SemanticRole.CLOSE || isNeutralFence(fence);
// }

/**
 * Determines if a symbol type can be embellished. Primitives that can be
 * embellished are operators, punctuations, relations, and fences.
 *
 * @param type The type.
 * @returns True if the type can be embellished.
 */
export function isEmbellishedType(type: SemanticType): boolean {
  return (
    type === SemanticType.OPERATOR ||
    type === SemanticType.RELATION ||
    type === SemanticType.FENCE ||
    type === SemanticType.PUNCTUATION
  );
}

/**
 * Secondary annotation facility. This allows to compute a special annotation,
 * if desired.
 */

/**
 * The mapping for secondary annotations.
 */
const secondary_ = new Map();

/**
 * The key generator for secondary annotations.
 *
 * @param kind The kind of annotation.
 * @param char The character to look up.
 * @returns The generated key.
 */
function secKey(kind: string, char: string) {
  return `${kind} ${char}`;
}

/**
 * Builds the secondary annotation structure.
 *
 * @param kind The kind of annotation.
 * @param char The character to define a secondary meaning on.
 * @param annotation Optionally an annotation value. Default is `kind`.
 */
function addSecondary(kind: string, char: string, annotation = '') {
    secondary_.set(secKey(kind, char), annotation || kind);
}

dashes.forEach(x => addSecondary('bar', x));
tildes.forEach(x => addSecondary('tilde', x));

/**
 * Lookup of secondary annotation.
 *
 * @param kind The kind of annotation.
 * @param char The character to look up.
 * @returns The annotation if it exists.
 */
export function lookupSecondary(kind: string, char: string) {
  return secondary_.get(secKey(kind, char));
}


/**
 * Initializes the dictionary mapping strings to meaning.
 *
 * @returns The dictionary mapping strings to
 *     semantic attributes.
 */
const meaning_: { [key: string]: SemanticMeaning } = (function () {
  const result: { [key: string]: SemanticMeaning } = {};
  for (let i = 0, st: MeaningSet; (st = symbolSetToSemantic_[i]); i++) {
    st.set.forEach(function (symbol) {
      result[symbol] = {
        role: st.role || SemanticRole.UNKNOWN,
        type: st.type || SemanticType.UNKNOWN,
        font: st.font || SemanticFont.UNKNOWN
      };
      if (st.secondary) {
        addSecondary(st.secondary, symbol);
      }
    });
  }
  return result;
})();

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
      meaning_[character] = meaning;
    }
  }
}

function addSecondaries(alphabet: string[], change: {[position: number]: string}) {
  for (let [pos, meaning] of Object.entries(change)) {
    let character = alphabet[pos as unknown as number];
    if (character !== undefined) {
      addSecondary(meaning, character)
    }
  }
}

function singleAlphabet(alphabet: Alphabet.Base, type: SemanticType,
                        role: SemanticRole, font: SemanticFont, semfont: SemanticFont,
                        secondaries: SemanticSecondary[] = [],
                        change: {[position: number]: SemanticMeaning} = {},
                        secondary: {[position: number]: string} = {}) {
  let interval = Alphabet.INTERVALS.get(Alphabet.alphabetName(alphabet, font));
  if (interval) {
    interval.unicode.forEach(x => {
      meaning_[x] = {
        type: type,
        role: role,
        font: semfont
      }
      secondaries.forEach(sec => addSecondary(sec, x));
    });
    changeSemantics(interval.unicode, change);
    addSecondaries(interval.unicode, secondary);
  }
}

function alphabets() {
  for (let font of Object.values(SemanticFont)) {
    let semfont = font === SemanticFont.FULLWIDTH ? SemanticFont.NORMAL : font;
    singleAlphabet(Alphabet.Base.LATINCAP, SemanticType.IDENTIFIER, SemanticRole.LATINLETTER, font, semfont, [SemanticSecondary.ALLLETTERS]);
    singleAlphabet(Alphabet.Base.LATINSMALL, SemanticType.IDENTIFIER, SemanticRole.LATINLETTER, font, semfont, [SemanticSecondary.ALLLETTERS], {},
                   {3: 'd'});
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

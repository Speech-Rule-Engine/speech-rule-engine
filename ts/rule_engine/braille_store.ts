//
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
 * @file Rule store for braille rules.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

//
// This work was sponsored by BTAA (Big Ten Academic Alliance).
//

import { MathStore } from './math_store.js';
import { AuditoryDescription } from '../audio/auditory_description.js';
import { activate } from '../semantic_tree/semantic_annotations.js';
import { SemanticMap } from '../semantic_tree/semantic_attr.js';
import {
  SemanticType,
  SemanticRole
} from '../semantic_tree/semantic_meaning.js';

/**
 * Braille rule store.
 */
export class BrailleStore extends MathStore {
  /**
   * @override
   */
  public modality = 'braille';

  /**
   * @override
   */
  public customTranscriptions: { [key: string]: string } = {
    '\u22ca': '⠈⠡⠳'
  };

  /**
   * @override
   */
  public evaluateString(str: string) {
    const descs: AuditoryDescription[] = [];
    const text = Array.from(str);
    for (let i = 0; i < text.length; i++) {
      descs.push(this.evaluateCharacter(text[i]));
    }
    return descs;
  }

  /**
   * @override
   */
  public annotations() {
    for (let i = 0, annotator; (annotator = this.annotators[i]); i++) {
      activate(this.locale, annotator);
    }
  }
}

/**
 * Euro Braille rule store.
 */
export class EuroStore extends BrailleStore {
  /**
   * @override
   */
  public locale = 'euro';

  /**
   * @override
   */
  public customTranscriptions = {};

  public customCommands: { [key: string]: string } = {
    '\\cdot': '*',
    '\\lt': '<',
    '\\gt': '>'
  };

  /**
   * @override
   */
  public evaluateString(str: string) {
    const regexp = /(\\[a-z]+|\\{|\\}|\\\\)/i;
    const split = str.split(regexp);
    const cleaned = this.cleanup(split);
    return super.evaluateString(cleaned);
  }

  /**
   * Cleaning up the command sequence:
   * Remove unnecessary spaces.
   * Replace commands if necessary.
   * Add spaces before relations and operators.
   * Add spaces between two consecutive commands.
   *
   * @param commands The list of commands and intermediate strings.
   * @returns A string with the cleanedup latex expression.
   */
  protected cleanup(commands: string[]): string {
    const cleaned: string[] = [];
    let intext = false;
    let lastcom = null;
    for (let command of commands) {
      if (command.match(/^\\/)) {
        if (command === '\\text') {
          intext = true;
        }
        if (this.addSpace(SemanticMap.LatexCommands.get(command))) {
          cleaned.push(' ');
        }
        command = this.customCommands[command] || command;
        const newcom = command.match(/^\\/);
        if (newcom && command.match(/^\\[a-zA-Z]+$/) && lastcom) {
          cleaned.push(' ');
        }
        lastcom = newcom ? command : null;
        cleaned.push(command);
        continue;
      }
      const rest = command.split('');
      for (const char of rest) {
        // TODO (Euro): This is still rather naive.
        if (intext) {
          cleaned.push(char);
          intext = char !== '}';
          lastcom = null;
          continue;
        }
        if (char.match(/[a-z]/i) && lastcom) {
          lastcom = null;
          cleaned.push(' ');
          cleaned.push(char);
          continue;
        }
        if (char.match(/\s/)) continue;
        if (this.addSpace(char)) {
          cleaned.push(' ');
        }
        cleaned.push(char);
        lastcom = null;
      }
    }
    return cleaned.join('');
  }

  private lastSpecial = false;
  private specialChars = ['^', '_', '{', '}'];

  /**
   * Determines if spaces should be added.
   *
   * @param char The character.
   * @returns True if a space should be added before the character.
   */
  private addSpace(char: string): boolean {
    if (!char) return false;
    if (this.specialChars.indexOf(char) !== -1) {
      this.lastSpecial = true;
      return false;
    }
    if (this.lastSpecial) {
      this.lastSpecial = false;
      return false;
    }
    const meaning = SemanticMap.Meaning.get(char);
    return (
      meaning.type === SemanticType.OPERATOR ||
      meaning.type === SemanticType.RELATION ||
      (meaning.type === SemanticType.PUNCTUATION &&
        meaning.role === SemanticRole.COLON)
    );
  }
}

/**
 * UEB Braille rule store.
 */
export class UebStore extends BrailleStore {
  /**
   * @override
   */
  public locale = 'ueb';

  /**
   * @override
   */
  public customTranscriptions: { [key: string]: string } = {
    '-': '⠐⠤'
  };

  /**
   * @override
   */
  public evaluateString(str: string) {
    const text = uebNumericString(str);
    if (text) {
      return [uebRawDescription(text)];
    }
    const result = super
      .evaluateString(str)
      .map((descr) => descr.text)
      .join('');
    return result ? [uebRawDescription(result)] : [];
  }
}

/**
 * Creates a raw UEB auditory description.
 *
 * @param text The raw UEB marker string.
 * @returns The auditory description.
 */
function uebRawDescription(text: string): AuditoryDescription {
  return AuditoryDescription.create(
    { text },
    { adjust: true, translate: false }
  );
}

/**
 * Transcribes a string that is entirely numeric.
 *
 * @param str The string to transcribe.
 * @returns The raw UEB marker string, or null for non-numeric strings.
 */
function uebNumericString(str: string): string {
  if (!/[0-9]/.test(str) || /[^0-9.,:\s\u00a0]/.test(str)) {
    return null;
  }
  let result = '';
  for (const char of Array.from(str)) {
    switch (char) {
      case '0':
        result += 'N⠚';
        break;
      case '1':
        result += 'N⠁';
        break;
      case '2':
        result += 'N⠃';
        break;
      case '3':
        result += 'N⠉';
        break;
      case '4':
        result += 'N⠙';
        break;
      case '5':
        result += 'N⠑';
        break;
      case '6':
        result += 'N⠋';
        break;
      case '7':
        result += 'N⠛';
        break;
      case '8':
        result += 'N⠓';
        break;
      case '9':
        result += 'N⠊';
        break;
      case ',':
        result += 'N⠂';
        break;
      case '.':
        result += 'N⠲';
        break;
      case ':':
        result += '#1c⠒';
        break;
      default:
        result += 'N⠐';
        break;
    }
  }
  return result;
}

/**
 * Replaces MathCAT UEB marker characters with their braille indicators.
 *
 * MathCAT's UEB unicode table uses ASCII/non-braille markers such as `N`,
 * `L`, `C`, and `1` as a post-processing language.  SRE mathmaps can carry
 * those markers, but they must be removed before the final braille string is
 * rendered.
 *
 * @param text The raw UEB string.
 * @returns The string with simple UEB indicators resolved.
 */
export function cleanupUeb(text: string): string {
  const result = pickUebStartMode(normalizeUebRawText(text)).replace(
    /tW/g,
    'W'
  );
  return replaceUebIndicators(result).replace(/⠀⠀+/g, '⠀');
}

/**
 * Normalizes cross-node UEB marker patterns before mode selection.
 *
 * @param text The raw UEB marker string.
 * @returns The normalized marker string.
 */
function normalizeUebRawText(text: string): string {
  let result = text;
  if (result.includes('⠘⠁') && result.includes('⠘⠢')) {
    result = result.replace(/([C𝐶]L.)(?=⠘⠢)/gu, '$1W');
  }
  if (shouldUseUebCapitalPassage(result)) {
    return '𝑪' + result.replace(/[C𝐶](?=(?:G)?L)/gu, '') + '𝒄';
  }
  if (isUebChemicalFormula(result)) {
    result = breakUebChemicalCapitalRuns(result);
  }
  return result;
}

/**
 * Chooses the initial UEB mode for an expression.
 *
 * @param text The raw UEB marker string.
 * @returns The marker string with start mode decisions applied.
 */
function pickUebStartMode(text: string): string {
  if (text.includes('⠈⠖⠠⠱')) {
    return (
      '𝟙' +
      removeUnneededUebModeChanges(text, 'grade1', 'word').replace(
        /(?:𝟙|⠰⠰)(?=⠈⠖⠠⠱)/gu,
        ''
      )
    );
  }
  if (needsUebGrade1Passage(text)) {
    return (
      '⠰⠰⠰' + removeUnneededUebModeChanges(text, 'grade1', 'passage') + '⠰⠄'
    );
  }
  const grade2 = removeUnneededUebModeChanges(
    applyUebContractions(text),
    'grade2',
    'symbol'
  );
  if (isUebGrade2StringOk(grade2)) {
    return grade2;
  }
  const grade1Word = tryUebGrade1WordMode(text);
  if (grade1Word) {
    return grade1Word;
  }
  return '⠰⠰⠰' + removeUnneededUebModeChanges(text, 'grade1', 'passage') + '⠰⠄';
}

const UEB_ASCII_BRAILLE: { [key: string]: string } = {
  a: '⠁',
  b: '⠃',
  c: '⠉',
  d: '⠙',
  e: '⠑',
  f: '⠋',
  g: '⠛',
  h: '⠓',
  i: '⠊',
  j: '⠚',
  k: '⠅',
  l: '⠇',
  m: '⠍',
  n: '⠝',
  o: '⠕',
  p: '⠏',
  q: '⠟',
  r: '⠗',
  s: '⠎',
  t: '⠞',
  u: '⠥',
  v: '⠧',
  w: '⠺',
  x: '⠭',
  y: '⠽',
  z: '⠵'
};

const UEB_CONTRACTIONS: [RegExp, string][] = [
  [uebLetters('and'), 'L⠯'],
  [uebLetters('for'), 'L⠿'],
  [uebLetters('of'), 'L⠷'],
  [uebLetters('the'), 'L⠮'],
  [uebLetters('with'), 'L⠾'],
  [/(L.)(L⠍L⠑L⠝L⠞)/gu, '$1L⠰L⠞'],
  [/(L.)(L⠞L⠊L⠕L⠝)/gu, '$1L⠰L⠝'],
  [uebLetters('ch'), 'L⠡'],
  [uebLetters('gh'), 'L⠣'],
  [uebLetters('sh'), 'L⠩'],
  [uebLetters('th'), 'L⠹'],
  [uebLetters('wh'), 'L⠱'],
  [uebLetters('ed'), 'L⠫'],
  [uebLetters('er'), 'L⠻'],
  [uebLetters('ou'), 'L⠳'],
  [uebLetters('ow'), 'L⠪'],
  [uebLetters('st'), 'L⠌'],
  [/(L.)L⠊L⠝L⠛/gu, '$1L⠬'],
  [uebLetters('ar'), 'L⠜'],
  [/(L.)L⠑L⠁(L.)/gu, '$1L⠂$2'],
  [/(L.)L⠃L⠃(L.)/gu, '$1L⠆$2'],
  [/(L.)L⠋L⠋(L.)/gu, '$1L⠖$2'],
  [/(L.)L⠛L⠛(L.)/gu, '$1L⠶$2'],
  [uebLetters('en'), '⠢'],
  [uebLetters('in'), '⠔']
];

/**
 * Converts an ASCII word to a UEB marked-letter regular expression.
 *
 * @param word The ASCII word.
 * @returns A regular expression matching the UEB marker form.
 */
function uebLetters(word: string): RegExp {
  return new RegExp(
    Array.from(word)
      .map((letter) => `L${UEB_ASCII_BRAILLE[letter]}`)
      .join(''),
    'gu'
  );
}

/**
 * Applies MathCAT's grade 2 contraction replacements to a marker string.
 *
 * @param text The raw UEB marker string.
 * @returns The marker string with grade 2 contractions applied.
 */
function applyUebContractions(text: string): string {
  return UEB_CONTRACTIONS.reduce(
    (result, [pattern, replacement]) => result.replace(pattern, replacement),
    text
  );
}

/**
 * Replaces remaining UEB marker characters with final braille cells.
 *
 * @param text The marker string after mode cleanup.
 * @returns The resolved braille string.
 */
function replaceUebIndicators(text: string): string {
  let result = '';
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    switch (char) {
      case 'L':
      case 'o':
      case 'c':
      case 'b':
      case '#':
        break;
      case 'C':
      case '𝐶': {
        const [caps, consumed] = uebCapitalLetterRun(chars, i);
        if (caps.length > 1) {
          result += '⠠⠠' + caps.join('');
          i += consumed - 1;
          break;
        }
        result += '⠠';
        break;
      }
      case '𝑪':
        result += '⠠⠠⠠';
        break;
      case '𝒄':
        result += '⠠⠄';
        break;
      case 'G':
        result += '⠨';
        break;
      case 'V':
        result += '⠨⠈';
        break;
      case 'B':
        result += '⠘';
        break;
      case 'T':
        result += '⠈';
        break;
      case 'I':
        result += '⠨';
        break;
      case 'N':
        result += '⠼';
        break;
      case '1':
        result += '⠰';
        break;
      case '𝟙':
        result += '⠰⠰';
        break;
      case 'W':
      case '𝐖':
        result += '⠀';
        break;
      case 't':
        result += '⠱';
        break;
      case 's':
        result += '⠆';
        break;
      case 'w':
        result += '⠂';
        break;
      case 'e':
        result += '⠄';
        break;
      case ',':
        result += '⠂';
        break;
      case '.':
        result += '⠲';
        break;
      case '-':
        result += '-';
        break;
      case '—':
        result += '⠠⠤';
        break;
      case '―':
        result += '⠐⠠⠤';
        break;
      default:
        result += char;
        break;
    }
  }
  return result;
}

/**
 * Reads a run of capital UEB letter markers.
 *
 * @param chars The marker characters.
 * @param start The start index.
 * @returns The braille cells in the run, and the number of consumed markers.
 */
function uebCapitalLetterRun(
  chars: string[],
  start: number
): [string[], number] {
  const cells: string[] = [];
  let i = start;
  while (
    i + 2 < chars.length &&
    (chars[i] === 'C' || chars[i] === '𝐶') &&
    chars[i + 1] === 'L'
  ) {
    cells.push(chars[i + 2]);
    i += 3;
  }
  return [cells, i - start];
}

/**
 * Determines if an expression should use a capital passage.
 *
 * @param text The raw UEB marker string.
 * @returns True if a capital passage is preferable.
 */
function shouldUseUebCapitalPassage(text: string): boolean {
  if (hasBareUebLetterMarker(text)) {
    return false;
  }
  const capitalLetters = text.match(/[C𝐶](?=(?:G)?L)/gu)?.length || 0;
  const middleDots = text.match(/⠐⠲/gu)?.length || 0;
  return (
    (middleDots >= 3 && capitalLetters >= 4) ||
    (capitalLetters >= 6 && /(?:W|⠐⠖|⠐⠶)/u.test(text))
  );
}

/**
 * Checks for a lowercase or mixed-case letter marker.
 *
 * @param text The raw UEB marker string.
 * @returns True if a letter marker is not capitalized.
 */
function hasBareUebLetterMarker(text: string): boolean {
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; i++) {
    if (chars[i] !== 'L') {
      continue;
    }
    const prev = chars[i - 1];
    const prevPrev = chars[i - 2];
    if (prev === 'C' || prev === '𝐶') {
      continue;
    }
    if (prev === 'G' && (prevPrev === 'C' || prevPrev === '𝐶')) {
      continue;
    }
    return true;
  }
  return false;
}

/**
 * Determines if a marker string looks like a chemical formula.
 *
 * @param text The raw UEB marker string.
 * @returns True if chemical-style capitalization should be preserved.
 */
function isUebChemicalFormula(text: string): boolean {
  return /1⠢N/u.test(text) && /[C𝐶]L.[C𝐶]L/u.test(text);
}

/**
 * Prevents two-letter chemical chunks from being compressed as capital words.
 *
 * @param text The raw UEB marker string.
 * @returns The marker string with capital runs separated.
 */
function breakUebChemicalCapitalRuns(text: string): string {
  return text.replace(/(?:[C𝐶]L.){2,}/gu, (run, offset: number) => {
    const letters = run.match(/[C𝐶]L./gu) || [];
    const isRomanSuperscript =
      /1⠔1⠣$/u.test(text.slice(0, offset)) &&
      letters.every((letter) =>
        UEB_ROMAN_NUMERAL_CELLS.has(Array.from(letter).at(-1))
      );
    return isRomanSuperscript ? run : letters.join('o');
  });
}

const UEB_ROMAN_NUMERAL_CELLS = new Set(['⠉', '⠙', '⠊', '⠇', '⠍', '⠧', '⠭']);

/**
 * Determines if an expression should use a grade 1 passage.
 *
 * @param text The raw UEB marker string.
 * @returns True if grade 1 passage mode is required.
 */
function needsUebGrade1Passage(text: string): boolean {
  return (
    (text.includes('⠘⠁') && text.includes('⠘⠢')) || text.includes('⠱W⠐⠶W1⠷')
  );
}

type UebMode = 'numeric' | 'grade1' | 'grade2';
type UebDuration = 'symbol' | 'word' | 'passage';

const UEB_LETTER_NUMBERS = new Set([
  '⠁',
  '⠃',
  '⠉',
  '⠙',
  '⠑',
  '⠋',
  '⠛',
  '⠓',
  '⠊',
  '⠚'
]);

const UEB_LEFT_INTERVENING = new Set([
  'B',
  'I',
  '𝔹',
  'S',
  'T',
  'D',
  'C',
  '𝐶',
  's',
  'w'
]);

const UEB_RIGHT_INTERVENING = new Set([...UEB_LEFT_INTERVENING, 'e']);

const UEB_LETTER_PREFIXES = new Set([
  'B',
  'I',
  '𝔹',
  'S',
  'T',
  'D',
  'C',
  '𝐶',
  '𝑐'
]);

const UEB_CAPITAL_PASSAGE_MARKERS = new Set(['𝑪', '𝒄']);

const UEB_GRADE1_SHORTFORMS = new Set(['L⠁L⠉']);

/**
 * Removes grade and numeric mode markers that are implied by current UEB mode.
 *
 * @param text The raw UEB marker string.
 * @param startMode The mode active at the start of the string.
 * @param startDuration The duration of the start mode.
 * @returns A marker string with unnecessary mode changes removed.
 */
function removeUnneededUebModeChanges(
  text: string,
  startMode: UebMode,
  startDuration: UebDuration
): string {
  let mode = startMode;
  let duration = startDuration;
  let result = '';
  const chars = Array.from(text);
  for (let i = 0; i < chars.length; ) {
    const char = chars[i];
    switch (mode) {
      case 'numeric':
        switch (char) {
          case 'B':
            if (chars[i + 1] === 'N') {
              result += 'Bs';
              i++;
              mode = 'grade1';
              break;
            }
            result += char;
            i++;
            mode = 'grade1';
            break;
          case 'L':
            if (UEB_LETTER_NUMBERS.has(chars[i + 1])) {
              result += '1';
            }
            result += char;
            i++;
            mode = 'grade1';
            break;
          case '1':
          case '𝟙':
            i++;
            mode = 'grade1';
            if (startDuration === 'passage') {
              duration = 'passage';
            }
            break;
          case '#':
            i++;
            if (
              i + 1 < chars.length &&
              chars[i] === 'L' &&
              UEB_LETTER_NUMBERS.has(chars[i + 1])
            ) {
              result += '1';
            }
            mode = 'grade1';
            break;
          case 'N':
            result += chars[i + 1] || '';
            i += 2;
            break;
          default:
            result += char;
            i++;
            if (isUebWordBreak(char)) {
              mode = startMode;
              if (startDuration !== 'passage') {
                duration = 'symbol';
              }
            } else {
              mode = 'grade1';
            }
            break;
        }
        break;
      case 'grade1':
        switch (char) {
          case 'L':
            result += char;
            i++;
            break;
          case '1':
          case '𝟙':
            if (chars[i + 1] === '⠻') {
              result += char;
            }
            i++;
            break;
          case '𝑪':
          case '𝒄':
            result += char;
            i++;
            break;
          case 'N':
            result += char + (chars[i + 1] || '');
            i += 2;
            mode = 'numeric';
            duration = 'word';
            break;
          case 'W':
          case '𝐖':
            result += char;
            i++;
            if (startDuration !== 'passage') {
              duration = 'symbol';
              mode = 'grade2';
            }
            break;
          default:
            result += char;
            i++;
            if (duration === 'symbol' && !UEB_LETTER_PREFIXES.has(char)) {
              mode = startMode;
            }
            break;
        }
        break;
      case 'grade2':
        switch (char) {
          case 'L': {
            const [alone, right, letters] = uebStandsAlone(chars, i);
            if (alone && (letters === 1 || isUebGrade1Shortform(right))) {
              result += '1';
              mode = 'grade1';
            }
            result += right.join('');
            i += right.length;
            break;
          }
          case 'C': {
            const isGreek = chars[i + 1] === 'G';
            const offset = isGreek ? i + 2 : i + 1;
            if (chars[offset] === 'L') {
              const [alone, right, letters] = uebStandsAlone(chars, offset);
              if (alone && letters === 1) {
                result += '1';
                mode = 'grade1';
              }
              result += isGreek ? 'CG' : 'C';
              result += right.join('');
              i = offset + right.length;
            } else {
              result += char;
              i++;
            }
            break;
          }
          case '1':
            result += char;
            i++;
            mode = 'grade1';
            duration = 'symbol';
            break;
          case '𝟙':
            i++;
            break;
          case '𝑪':
          case '𝒄':
            result += char;
            i++;
            break;
          case 'N':
            result += char + (chars[i + 1] || '');
            i += 2;
            mode = 'numeric';
            duration = 'word';
            break;
          default:
            result += char;
            i++;
            break;
        }
        break;
    }
    if (
      (char === 'W' || char === '𝐖') &&
      mode === 'grade2' &&
      uebUseGrade1WordMode(chars.slice(i)) === 'inWord'
    ) {
      mode = 'grade1';
      duration = 'word';
      result += '𝟙';
    }
  }
  return result;
}

/**
 * Tests if a marker terminates a UEB word or numeric mode.
 *
 * @param char The marker or braille character.
 * @returns True if it is a UEB word break.
 */
function isUebWordBreak(char: string): boolean {
  return (
    char === 'W' || char === '𝐖' || char === '-' || char === '—' || char === '―'
  );
}

/**
 * Tests if an expression can remain in grade 2 mode.
 *
 * @param text The marker string after grade 2 cleanup.
 * @returns True if no wider grade 1 mode is needed.
 */
function isUebGrade2StringOk(text: string): boolean {
  const chars = Array.from(text);
  let foundGrade1 = false;
  let realChars = 0;
  let i = 0;
  while (i < chars.length) {
    const char = chars[i];
    if (char === '1' && !isForcedUebGrade1(chars, i)) {
      if (foundGrade1) {
        return false;
      }
      foundGrade1 = true;
    } else if (
      '𝐶CLobc'.indexOf(char) === -1 &&
      !UEB_CAPITAL_PASSAGE_MARKERS.has(char)
    ) {
      if (realChars === 2) {
        i++;
        break;
      }
      realChars++;
    }
    i++;
  }
  let standingAloneSeen = false;
  let isAfterWhitespace = false;
  while (i < chars.length) {
    const char = chars[i];
    if (char === 'W') {
      isAfterWhitespace = true;
    } else if (char === '1' && !isForcedUebGrade1(chars, i)) {
      if (
        standingAloneSeen ||
        ((foundGrade1 || !isAfterWhitespace) &&
          !isUebSingleLetterOnRight(chars, i))
      ) {
        return false;
      }
      foundGrade1 = true;
      standingAloneSeen = true;
    }
    i++;
  }
  return true;
}

/**
 * Attempts to use a grade 1 word indicator for one symbol sequence.
 *
 * @param text The raw UEB marker string.
 * @returns A marker string with grade 1 word mode, or empty if not possible.
 */
function tryUebGrade1WordMode(text: string): string {
  const words: string[] = [];
  let foundWordMode = false;
  for (const word of text.split('W')) {
    const grade2 = removeUnneededUebModeChanges(
      applyUebContractions(word),
      'grade2',
      'symbol'
    );
    const chars = Array.from(grade2);
    const needsWordMode = chars.some(
      (char, i) => char === '1' && !isForcedUebGrade1(chars, i)
    );
    if (needsWordMode) {
      if (foundWordMode) {
        return '';
      }
      foundWordMode = true;
      words.push('𝟙' + removeUnneededUebModeChanges(word, 'grade1', 'word'));
    } else {
      words.push(grade2);
    }
  }
  return foundWordMode ? words.join('W') : '';
}

/**
 * Checks if the next symbol sequence contains a grade 1 word marker.
 *
 * @param chars The remaining marker characters.
 * @returns The grade 1 word marker state.
 */
function uebUseGrade1WordMode(
  chars: string[]
): 'inWord' | 'notInWord' | 'notInChars' {
  for (const char of chars) {
    if (char === 'W' || char === '𝐖') {
      return 'notInWord';
    }
    if (char === '𝟙') {
      return 'inWord';
    }
  }
  return 'notInChars';
}

/**
 * Tests if a grade 1 marker is forced by a preceding number.
 *
 * @param chars The marker characters.
 * @param i The index of a grade 1 marker.
 * @returns True if the marker is forced.
 */
function isForcedUebGrade1(chars: string[], i: number): boolean {
  if (chars[i] !== '1') {
    return false;
  }
  if (chars[i + 1] === '⠻') {
    return true;
  }
  if (i + 2 >= chars.length || !UEB_LETTER_NUMBERS.has(chars[i + 2])) {
    return false;
  }
  for (let j = i - 1; j >= 0; j--) {
    const char = chars[j];
    if (char === 'W' || char === '𝐖') {
      return false;
    }
    if (!UEB_LETTER_NUMBERS.has(char) && char !== '.' && char !== ',') {
      return char === 'N';
    }
  }
  return false;
}

/**
 * Tests if one letter follows a grade 1 marker.
 *
 * @param chars The marker characters.
 * @param i The index of a grade 1 marker.
 * @returns True if exactly one marked letter follows.
 */
function isUebSingleLetterOnRight(chars: string[], i: number): boolean {
  const skip = new Set(['B', 'I', '𝔹', 'S', 'T', 'D', 'C', '𝐶', 's', 'w']);
  let count = 0;
  for (let j = i + 1; j < chars.length; ) {
    const char = chars[j];
    if (!skip.has(char)) {
      if (char === 'L') {
        if (count === 1) {
          return false;
        }
        count++;
      } else {
        return count === 1;
      }
      j += 2;
    } else {
      j++;
    }
  }
  return true;
}

/**
 * Tests if a standing-alone letter sequence conflicts with a UEB shortform.
 *
 * @param chars The matched marker characters.
 * @returns True if the sequence needs a grade 1 indicator.
 */
function isUebGrade1Shortform(chars: string[]): boolean {
  return UEB_GRADE1_SHORTFORMS.has(chars.join(''));
}

/**
 * Computes whether a marked letter sequence is standing alone.
 *
 * @param chars The marker characters.
 * @param i The index of the letter marker.
 * @returns Whether it stands alone, matched characters, and letter count.
 */
function uebStandsAlone(
  chars: string[],
  i: number
): [boolean, string[], number] {
  if (chars[i] !== 'L') {
    return [false, [chars[i]], 0];
  }
  if (!uebLeftStandsAlone(chars.slice(0, i))) {
    return [false, chars.slice(i, i + 2), 0];
  }
  let [alone, letters, matched] = uebRightStandsAlone(chars.slice(i + 2));
  if (alone && letters === 1) {
    const char = chars[i + 1];
    if (char === '⠁' || char === '⠊' || char === '⠕') {
      alone = false;
    }
  }
  return [alone, chars.slice(i, i + 2 + matched), letters];
}

/**
 * Tests the left side of a possible standing-alone sequence.
 *
 * @param chars The marker characters before the sequence.
 * @returns True if the left side satisfies the UEB standing-alone rule.
 */
function uebLeftStandsAlone(chars: string[]): boolean {
  let intervening = false;
  let i = chars.length;
  while (i > 0) {
    i--;
    const char = chars[i];
    const previous = i > 0 ? chars[i - 1] : '';
    if (
      (!intervening && previous === 'L') ||
      previous === 'o' ||
      previous === 'b' ||
      previous === 'c'
    ) {
      intervening = true;
      i--;
    } else if (UEB_LEFT_INTERVENING.has(char)) {
      intervening = true;
    } else {
      return isUebWordBreak(char);
    }
  }
  return true;
}

/**
 * Tests the right side of a possible standing-alone sequence.
 *
 * @param chars The marker characters after the first marked letter.
 * @returns Whether it stands alone, letter count, and matched character count.
 */
function uebRightStandsAlone(chars: string[]): [boolean, number, number] {
  let intervening = false;
  let i = 0;
  let letters = 1;
  while (i < chars.length) {
    const char = chars[i];
    if (!intervening && char === 'L') {
      letters++;
      i++;
    } else if (char === 'c' || char === 'b') {
      i++;
    } else if (UEB_RIGHT_INTERVENING.has(char)) {
      intervening = true;
    } else {
      return isUebWordBreak(char) ? [true, letters, i] : [false, letters, i];
    }
    i++;
  }
  return [true, letters, chars.length];
}

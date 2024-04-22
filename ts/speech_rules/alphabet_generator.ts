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
 * @file Generator for simple speech rules wrt. symbol intervals of
 *     Unicode mappings.
 */

import * as Alphabet from './alphabet.js';
import { Engine } from '../common/engine.js';
import * as EngineConst from '../common/engine_const.js';
import * as L10n from '../l10n/l10n.js';
import { LOCALE } from '../l10n/locale.js';
import { localeFontCombiner } from '../l10n/locale_util.js';
import { Combiner, Transformer } from '../l10n/transformers.js';
import * as MathCompoundStore from '../rule_engine/math_compound_store.js';
import { UnicodeJson } from '../rule_engine/math_simple_store.js';

/**
 * Structure to hold domain combinations for a locale during rule generation.
 */
const Domains: { [key: string]: string[] } = {
  small: ['default'],
  capital: ['default'],
  digit: ['default']
};

/**
 * Generates the domain combinations for the given locale.
 */
function makeDomains() {
  const alph = LOCALE.ALPHABETS;
  const combineKeys = (
    obj1: { [key: string]: any },
    obj2: { [key: string]: any }
  ) => {
    const result: { [key: string]: boolean } = {};
    Object.keys(obj1).forEach((k) => (result[k] = true));
    Object.keys(obj2).forEach((k) => (result[k] = true));
    return Object.keys(result);
  };
  Domains.small = combineKeys(alph.smallPrefix, alph.letterTrans);
  Domains.capital = combineKeys(alph.capPrefix, alph.letterTrans);
  Domains.digit = combineKeys(alph.digitPrefix, alph.digitTrans);
}

/**
 * Generates alphabet information in the base locale.
 */
export function generateBase() {
  for (const int of Alphabet.INTERVALS.values()) {
    const letters = int.unicode;
    for (const letter of letters) {
      MathCompoundStore.baseStores.set(letter, {
        key: letter,
        category: int.category
      });
    }
  }
}

/**
 * Generates alphabet rules for the locale and adds them to the given store.
 *
 * @param locale The current locale.
 */
export function generate(locale: string) {
  const oldLocale = Engine.getInstance().features.get(EngineConst.Axis.LOCALE);
  Engine.getInstance().features.set(EngineConst.Axis.LOCALE, locale);
  L10n.setLocale();
  MathCompoundStore.changeLocale({ locale: locale } as UnicodeJson);
  makeDomains();
  for (const int of Alphabet.INTERVALS.values()) {
    const letters = int.unicode;
    if ('offset' in int) {
      numberRules(letters, int.font, int.offset || 0);
    } else {
      const alphabet = (LOCALE.ALPHABETS as any)[int.base];
      alphabetRules(letters, alphabet, int.font, !!int.capital);
    }
  }
  Engine.getInstance().features.set(EngineConst.Axis.LOCALE, oldLocale);
  L10n.setLocale();
}

/**
 * Retrieves font value for the current locale.
 *
 * @param font The font of an alphabet.
 * @returns The localised font value plus a combiner.
 */
function getFont(font: string): { font: string; combiner: Combiner } {
  const realFont =
    font === 'normal' || font === 'fullwidth'
      ? ''
      : LOCALE.MESSAGES.font[font] || LOCALE.MESSAGES.embellish[font] || '';
  // TODO: Combiners: Retrieve with string here.
  return localeFontCombiner(realFont);
}

/**
 * Generates rules for letters.
 *
 * @param unicodes The actual unicode characters corrsponding
 *     to the values in keys.
 * @param letters The letters of the corresponding alphabet.
 * @param font The font name.
 * @param cap True if it is an alphabet of capitals.
 */
function alphabetRules(
  unicodes: string[],
  letters: string[],
  font: string,
  cap: boolean
) {
  const realFont = getFont(font);
  for (
    let i = 0, unicode, letter;
    (unicode = unicodes[i]), (letter = letters[i]);
    i++
  ) {
    const prefixes = cap
      ? LOCALE.ALPHABETS.capPrefix
      : LOCALE.ALPHABETS.smallPrefix;
    const domains = cap ? Domains.capital : Domains.small;
    makeLetter(
      realFont.combiner,
      unicode,
      letter,
      realFont.font,
      prefixes,
      LOCALE.ALPHABETS.letterTrans,
      domains
    );
  }
}

/**
 * Generates rules for numbers.
 *
 * @param unicodes The actual unicode characters corrsponding
 *     to the values in keys.
 * @param font The font name.
 * @param offset The offset value for the initial number.
 */
function numberRules(unicodes: string[], font: string, offset: number) {
  const realFont = getFont(font);
  for (let i = 0, unicode; (unicode = unicodes[i]); i++) {
    const prefixes = LOCALE.ALPHABETS.digitPrefix;
    const num = i + offset;
    makeLetter(
      realFont.combiner,
      unicode,
      num,
      realFont.font,
      prefixes,
      LOCALE.ALPHABETS.digitTrans,
      Domains.digit
    );
  }
}

/**
 * Makes all rules for a single character.
 *
 * @param combiner The combining
 *     function for generating the rule action.
 * @param unicode The actual unicode character.
 * @param letter The letter of the corresponding alphabet or
 *     number.
 * @param font The font name.
 * @param prefixes The prefixes for caps, small, or number.
 * @param transformers The transformer method
 *      for the particular type of character.
 * @param domains The list of domains in which to create
 *     rules. They correspond to the union of the domains for prefixes and
 *     transformers.
 */
function makeLetter(
  combiner: Combiner,
  unicode: string,
  letter: string | number,
  font: string,
  prefixes: { [key: string]: string },
  transformers: { [key: string]: Transformer },
  domains: string[]
) {
  for (let i = 0, domain; (domain = domains[i]); i++) {
    const transformer =
      domain in transformers ? transformers[domain] : transformers['default'];
    const prefix = domain in prefixes ? prefixes[domain] : prefixes['default'];
    MathCompoundStore.defineRule(
      domain,
      'default',
      unicode,
      combiner(transformer(letter), font, prefix)
    );
  }
}

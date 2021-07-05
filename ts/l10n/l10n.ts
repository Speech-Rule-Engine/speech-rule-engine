//
// Copyright 2017-21 Volker Sorge
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
 * @fileoverview Basic message file for l10n.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {Engine} from '../common/engine';
import {Variables} from '../common/variables';

import {de} from './locales/locale_de';
import {en} from './locales/locale_en';
import {es} from './locales/locale_es';
import {fr} from './locales/locale_fr';
import {hi} from './locales/locale_hi';
import {it} from './locales/locale_it';
import {ko} from './locales/locale_ko';
import {nemeth} from './locales/locale_nemeth';
import {Locale, LOCALE} from './locale';


export const locales: {[key: string]: () => Locale} = {
  'de': de,
  'en': en,
  'es': es,
  'fr': fr,
  'hi': hi,
  'it': it,
  'ko': ko,
  'nemeth': nemeth
};

/**
 * The basic method for setting the localized messages.
 */
export function setLocale() {
  let msgs = getLocale();
  if (msgs) {
    for (let key of Object.getOwnPropertyNames(msgs)) {
      // TODO (TS): See if this is really an object structure.
      (LOCALE as any)[key] = (msgs as any)[key];
    }
    // TODO (Speech Rules): This is temporary until locales are handled in a
    // bespoke class.
    // Locale.ALPHABETS.digitTrans.default = msgs.NUMBERS.numberToWords;
  }
}


/**
 * Gets locale message object. If the currently set locale does not exist, it
 * defaults to English.
 * @return A message object.
 */
export function getLocale(): Locale {
  let locale = Engine.getInstance().locale;
  if (Variables.LOCALES.indexOf(locale) === -1) {
    console.error('Locale ' + locale + ' does not exist! Using en instead.');
    Engine.getInstance().locale = 'en';
  }
  return (locales[Engine.getInstance().locale] || locales['en'])();
}


/**
 * Locale completion with loaded mathmaps.
 * @param json The JSON of the locale map.
 */
export function completeLocale(json: any) {
  let locale = locales[json.locale];
  if (!locale) {
    console.error('Locale ' + json.locale + ' does not exist!');
    return;
  }
  let kind = json.kind.toUpperCase();
  let messages = json.messages;
  if (!messages) return;
  let loc = locale() as any;
  for (let [key, value] of Object.entries(messages)) {
    // TODO (TS): See if this is really an object structure.
    loc[kind][key] = value;
  }
}

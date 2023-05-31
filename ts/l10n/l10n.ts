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
 * @file Basic message file for l10n.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import Engine from '../common/engine.js';
import { Variables } from '../common/variables.js';
import { Grammar } from '../rule_engine/grammar.js';

import { ca } from './locales/locale_ca.js';
import { da } from './locales/locale_da.js';
import { de } from './locales/locale_de.js';
import { en } from './locales/locale_en.js';
import { es } from './locales/locale_es.js';
import { euro } from './locales/locale_euro.js';
import { fr } from './locales/locale_fr.js';
import { hi } from './locales/locale_hi.js';
import { it } from './locales/locale_it.js';
import { nb } from './locales/locale_nb.js';
import { nemeth } from './locales/locale_nemeth.js';
import { nn } from './locales/locale_nn.js';
import { sv } from './locales/locale_sv.js';
import { Locale, LOCALE } from './locale.js';

export const locales: { [key: string]: () => Locale } = {
  ca: ca,
  da: da,
  de: de,
  en: en,
  es: es,
  euro: euro,
  fr: fr,
  hi: hi,
  it: it,
  nb: nb,
  nn: nn,
  sv: sv,
  nemeth: nemeth
};

/**
 * The basic method for setting the localized messages.
 */
export function setLocale() {
  const msgs = getLocale();
  setSubiso(msgs);
  if (msgs) {
    for (const key of Object.getOwnPropertyNames(msgs)) {
      // TODO (TS): See if this is really an object structure.
      (LOCALE as any)[key] = (msgs as any)[key];
    }
    for (const [key, func] of Object.entries(msgs.CORRECTIONS)) {
      Grammar.getInstance().setCorrection(key, func);
    }
    // TODO (Speech Rules): This is temporary until locales are handled in a
    // bespoke class.
    // Locale.ALPHABETS.digitTrans.default = msgs.NUMBERS.numberToWords;
  }
}

/**
 * Sets the current subiso code if one exists.
 *
 * @param msg The current locale message structure.
 */
function setSubiso(msg: Locale) {
  const subiso = Engine.getInstance().subiso;
  if (msg.SUBISO.all.indexOf(subiso) === -1) {
    Engine.getInstance().subiso = msg.SUBISO.default;
  }
  msg.SUBISO.current = Engine.getInstance().subiso;
}

/**
 * Gets locale message object. If the currently set locale does not exist, it
 * defaults to English.
 *
 * @returns A message object.
 */
function getLocale(): Locale {
  const locale = Variables.ensureLocale(
    Engine.getInstance().locale,
    Engine.getInstance().defaultLocale
  );
  Engine.getInstance().locale = locale;
  return locales[locale]();
}

/**
 * Locale completion with loaded mathmaps.
 *
 * @param json The JSON of the locale map.
 */
export function completeLocale(json: any) {
  const locale = locales[json.locale];
  if (!locale) {
    console.error('Locale ' + json.locale + ' does not exist!');
    return;
  }
  const kind = json.kind.toUpperCase();
  const messages = json.messages;
  if (!messages) return;
  const loc = locale() as any;
  for (const [key, value] of Object.entries(messages)) {
    // TODO (TS): See if this is really an object structure.
    loc[kind][key] = value;
  }
}

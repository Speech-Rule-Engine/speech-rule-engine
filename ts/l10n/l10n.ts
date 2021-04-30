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

import {de} from './locale_de';
import {en} from './locale_en';
import {es} from './locale_es';
import {fr} from './locale_fr';
import {hi} from './locale_hi';
import {it} from './locale_it';
import {nemeth} from './locale_nemeth';
import {Locale, Messages} from './messages';


export const locales: {[key: string]: Messages} = {
  'de': de,
  'en': en,
  'es': es,
  'fr': fr,
  'hi': hi,
  'it': it,
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
      (Locale as any)[key] = (msgs as any)[key];
    }
  }
}


/**
 * Gets locale message object. If the currently set locale does not exist, it
 * defaults to English.
 * @return A message object.
 */
export function getLocale(): Messages {
  let locale = Engine.getInstance().locale;
  if (Variables.LOCALES.indexOf(locale) === -1) {
    console.error('Locale ' + locale + ' does not exist! Using en instead.');
    Engine.getInstance().locale = 'en';
  }
  return locales[Engine.getInstance().locale] || locales['en'];
}

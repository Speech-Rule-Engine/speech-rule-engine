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

import {Alphabets, ALPHABETS, Functions, FUNCTIONS,
        Messages, MESSAGES, Numbers, NUMBERS} from './messages';
import * as tr from './transformers';


// One (or more) flat message object per rule set.
export interface Locale {
  FUNCTIONS: Functions;
  MESSAGES: Messages;
  ALPHABETS: Alphabets;
  NUMBERS: Numbers;
  COMBINERS?: {[key: string]: tr.Combiner};
  CORRECTIONS?: {[key: string]: Function};
}

export const LOCALE: Locale = createLocale();

export function createLocale(): Locale {
  return {

  /**
   * Localisable parse functions
   */
  FUNCTIONS: FUNCTIONS(),

  /**
   * The messages content.
   */
  MESSAGES: MESSAGES(),

  /**
   * The Alphabets content.
   */
  ALPHABETS: ALPHABETS(),

  /**
   * Localisable number computation.
   */
  NUMBERS: NUMBERS(),

  /**
   * Combiners that can be reference in Messages.
   */
  COMBINERS: {},

  /**
   * Grammatical corrections for this locale.
   */
  CORRECTIONS: {}

  };

}

//
// Copyright 2026 Volker Sorge
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
 * @file UEB Braille message file.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import { createLocale, Locale } from '../locale.js';

let locale: Locale = null;

/**
 * @returns The UEB locale.
 */
export function ueb(): Locale {
  if (!locale) {
    locale = createLocale();
  }
  return locale;
}

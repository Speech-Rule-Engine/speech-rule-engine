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
 * @file A class for loading and storing the maps for math atoms from
 * JSON files. The class (and entries) can then be used as via the
 * background page.
 * @author sorge@google.com (Volker Sorge)
 */

import * as BrowserUtil from '../common/browser_util';
import Engine, { EnginePromise } from '../common/engine';
import * as EngineConst from '../common/engine_const';
import * as FileUtil from '../common/file_util';
import SystemExternal from '../common/system_external';
import { RulesJson } from '../rule_engine/base_rule_store';
import { DynamicCstr } from '../rule_engine/dynamic_cstr';
import * as MathCompoundStore from '../rule_engine/math_compound_store';
import { SiJson, UnicodeJson } from '../rule_engine/math_simple_store';
import { SpeechRuleEngine } from '../rule_engine/speech_rule_engine';

import { completeLocale } from '../l10n/l10n';
import * as AlphabetGenerator from './alphabet_generator';

declare type MathMapType = UnicodeJson[] | [SiJson] | RulesJson;

interface MathMapJson {
  [key: string]: MathMapType;
}

/**
 * The compund store for symbol and function mappings.
 */
export const store = MathCompoundStore;

/**
 * Methods for parsing json structures.
 */
const addSymbols: { [key: string]: (p1: MathMapType) => any } = {
  functions: MathCompoundStore.addFunctionRules,
  symbols: MathCompoundStore.addSymbolRules,
  units: MathCompoundStore.addUnitRules,
  si: MathCompoundStore.setSiPrefixes
};

let _init = false;

/**
 * Loads a new locale if necessary. Initialises mathmaps if necessary, by
 * loading the base locale when called for the first time.
 *
 * @param locale The locale to be loaded. Defaults to current locale of the
 *     engine.
 * @returns Promise that resolves once locale is loaded.
 */
export async function loadLocale(locale = Engine.getInstance().locale) {
  if (!_init) {
    _loadLocale(DynamicCstr.BASE_LOCALE);
    _init = true;
  }
  return EnginePromise.promises[DynamicCstr.BASE_LOCALE].then(async () => {
    const defLoc = Engine.getInstance().defaultLocale;
    if (defLoc) {
      _loadLocale(defLoc);
      return EnginePromise.promises[defLoc].then(async () => {
        _loadLocale(locale);
        return EnginePromise.promises[locale];
      });
    }
    _loadLocale(locale);
    return EnginePromise.promises[locale];
  });
}

/**
 * Loads a new locale if necessary.
 *
 * @param locale The locale to be loaded. Defaults to current locale of the
 *     engine.
 */
function _loadLocale(locale = Engine.getInstance().locale) {
  if (!EnginePromise.loaded[locale]) {
    EnginePromise.loaded[locale] = [false, false];
    retrieveMaps(locale);
  }
}

// Custom loader of file
// Gets the name of the locale.
// Returns a promise that resolves once the file is loaded.
/**
 * @returns The load method for the given mode. If a custom load method is
 *     provided it is returned instead.
 */
function loadMethod() {
  if (Engine.getInstance().customLoader) {
    return Engine.getInstance().customLoader;
  }
  return standardLoader();
}

/**
 * @returns The standard load method for the given mode. This is exported as
 * fall back method.
 */
export function standardLoader() {
  switch (Engine.getInstance().mode) {
    case EngineConst.Mode.ASYNC:
      return loadFile;
    case EngineConst.Mode.HTTP:
      return loadAjax;
    case EngineConst.Mode.SYNC:
    default:
      return loadFileSync;
  }
}

/**
 * Retrieves JSON rule mappings for a given locale.
 *
 * @param locale The target locale.
 */
export function retrieveFiles(locale: string) {
  const loader = loadMethod();
  const promise = new Promise<string>((res) => {
    const inner = loader(locale);
    inner.then(
      (str: string) => {
        parseMaps(str);
        EnginePromise.loaded[locale] = [true, true];
        res(locale);
      },
      (_err: string) => {
        EnginePromise.loaded[locale] = [true, false];
        console.error(`Unable to load locale: ${locale}`);
        Engine.getInstance().locale = Engine.getInstance().defaultLocale;
        res(locale);
      }
    );
  });
  EnginePromise.promises[locale] = promise;
}

/**
 * Parses JSON mappings from a string and them to the MathStore.
 *
 * @param json The json mappings string.
 */
export function parseMaps(json: string) {
  const js = JSON.parse(json) as { [key: string]: any[] };
  addMaps(js);
}

/**
 * Adds JSON mappings to the mathmap store.
 *
 * @param json The json mappings.
 * @param opt_locale Optionally the locale for the mappings to
 *     add. This is necessary for the single IE dictionary.
 */
function addMaps(json: MathMapJson, opt_locale?: string) {
  let generate = true;
  for (let i = 0, key; (key = Object.keys(json)[i]); i++) {
    const info = key.split('/');
    if (opt_locale && opt_locale !== info[0]) {
      continue;
    }
    if (info[1] === 'rules') {
      SpeechRuleEngine.getInstance().addStore(json[key] as RulesJson);
    } else if (info[1] === 'messages') {
      completeLocale(json[key]);
    } else {
      if (generate) {
        AlphabetGenerator.generate(info[0]);
        generate = false;
      }
      (json[key] as UnicodeJson[] | [SiJson]).forEach(addSymbols[info[1]]);
    }
  }
}

/**
 * Retrieves mappings and adds them to the respective stores.
 *
 * @param locale The target locale.
 */
function retrieveMaps(locale: string) {
  if (
    Engine.getInstance().isIE &&
    Engine.getInstance().mode === EngineConst.Mode.HTTP
  ) {
    getJsonIE_(locale);
    return;
  }
  retrieveFiles(locale);
}

/**
 * Gets JSON elements from the global JSON object in case of IE browsers.
 *
 * @param locale The target locale.
 * @param opt_count Optional counter argument for callback.
 */
function getJsonIE_(locale: string, opt_count?: number) {
  let count = opt_count || 1;
  if (!BrowserUtil.mapsForIE) {
    if (count <= 5) {
      setTimeout((() => getJsonIE_(locale, count++)).bind(this), 300);
    }
    return;
  }
  addMaps(BrowserUtil.mapsForIE as MathMapJson, locale);
}

/**
 * Computes path to a JSON file from the locale and returns a JSON object.
 *
 * @param locale The locale to be loaded.
 * @returns A promise the resolves to the JSON string.
 */
export function loadFile(locale: string): Promise<string> {
  const file = FileUtil.localePath(locale);
  return new Promise((res, rej) => {
    SystemExternal.fs.readFile(file, 'utf8', (err: Error, json: string) => {
      if (err) {
        return rej(err);
      }
      res(json);
    });
  });
}

/**
 * Loads JSON for a given file name.
 *
 * @param locale The locale to retrieve.
 * @returns A string representing a JSON array.
 */
export function loadFileSync(locale: string): Promise<string> {
  const file = FileUtil.localePath(locale);
  return new Promise((res, rej) => {
    let str = '{}';
    try {
      str = SystemExternal.fs.readFileSync(file, 'utf8');
    } catch (err) {
      return rej(err);
    }
    res(str);
  });
}

/**
 * Sents AJAX request to retrieve a JSON rule file.
 *
 * @param locale The locale to retrieve.
 * @returns A promise the resolves to the JSON string.
 */
export function loadAjax(locale: string): Promise<string> {
  const file = FileUtil.localePath(locale);
  const httpRequest = new XMLHttpRequest();
  return new Promise((res, rej) => {
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        const status = httpRequest.status;
        if (status === 0 || (status >= 200 && status < 400)) {
          res(httpRequest.responseText);
        } else {
          rej(status);
        }
      }
    };
    httpRequest.open('GET', file, true);
    httpRequest.send();
  });
}

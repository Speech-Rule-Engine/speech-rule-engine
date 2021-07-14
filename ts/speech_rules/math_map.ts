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
 * @fileoverview A class for loading and storing the maps for math atoms from
 * JSON files. The class (and entries) can then be used as via the
 * background page.
 * @author sorge@google.com (Volker Sorge)
 */


import * as BaseUtil from '../common/base_util';
import * as BrowserUtil from '../common/browser_util';
import {Engine, EngineConst} from '../common/engine';
import SystemExternal from '../common/system_external';
import {RulesJson} from '../rule_engine/base_rule_store';
import {DynamicCstr} from '../rule_engine/dynamic_cstr';
import {MathCompoundStore, SiJson, UnicodeJson} from '../rule_engine/math_simple_store';
import {SpeechRuleEngine} from '../rule_engine/speech_rule_engine';

import {completeLocale} from '../l10n/l10n';
import * as AlphabetGenerator from './alphabet_generator';


declare type MathMapType = UnicodeJson[] | [SiJson] | RulesJson;

interface MathMapJson {
  [key: string]: MathMapType;
}

export namespace MathMap {

  /**
   * The compund store for symbol and function mappings.
   */


  /**
   * Files left to fetch in asynchronous mode.
   */
  export let toFetch_: number = 0;

  let loaded_: string[] = [];

  export let store = MathCompoundStore;

  /**
   * Methods for parsing json structures.
   */
  const addSymbols: {[key: string]: (p1: MathMapType) => any} = {
      functions: MathCompoundStore.addFunctionRules,
      symbols: MathCompoundStore.addSymbolRules,
      units: MathCompoundStore.addUnitRules,
      si: addSiPrefixes
    };

  /**
   * Adds the Si prefix mapping.
   * @param json Single dictionary object.
   */
  function addSiPrefixes(json: SiJson) {
    MathCompoundStore.siPrefixes = json;
  }

  export function lookupString(node: string, dynamic: DynamicCstr) {
    return MathCompoundStore.lookupString(node, dynamic);
  }


  /**
   * @return The instance of the MathMap singleton.
   */
  // TODO (TS): This will become the promise one day.
  export function getInstance(): {[key: string]: Function} {
    loadLocale('base');
    loadLocale();
    return {lookupString, retrieveFiles, parseMaps};
  }


  /**
   * Loads a new locale if necessary.
   */
  export function loadLocale(locale = Engine.getInstance().locale) {
    if (loaded_.indexOf(locale) === -1) {
      SpeechRuleEngine.getInstance().prune = true;
      retrieveMaps(locale);
      loaded_.push(locale);
    }
  }


  /**
   * Retrieves JSON rule mappings for a given locale.
   * @param file The target locale.
   * @param parse Method adding the rules.
   */
  export function retrieveFiles(
      file: string, parse: (p1: string) => MathMapJson) {
    let async = Engine.getInstance().mode === EngineConst.Mode.ASYNC;
    if (async) {
      Engine.getInstance().mode = EngineConst.Mode.SYNC;
    }
    switch (Engine.getInstance().mode) {
      case EngineConst.Mode.ASYNC:
        MathMap.toFetch_++;
        fromFile_(file, (err: Error, json: string) => {
          MathMap.toFetch_--;
          if (err) {
            return;
          }
          parse(json);
        });
        break;
      case EngineConst.Mode.HTTP:
        MathMap.toFetch_++;
        getJsonAjax_(file, parse);
        break;
      case EngineConst.Mode.SYNC:
      default:
        let strs = loadFile(file);
        parse(strs);
        break;
    }
    if (async) {
      Engine.getInstance().mode = EngineConst.Mode.ASYNC;
    }
  }


  /**
   * Parses JSON mappings from a string and them to the MathStore.
   * @param json The json mappings string.
   */
  export function parseMaps(json: string) {
    let js = (JSON.parse(json) as {[key: string]: any[]});
    addMaps(js);
  }


  /**
   * Adds JSON mappings to the mathmap store.
   * @param json The json mappings.
   * @param opt_locale Optionally the locale for the mappings to
   *     add. This is necessary for the single IE dictionary.
   */
  function addMaps(json: MathMapJson, opt_locale?: string) {
    let generate = true;
    for (let i = 0, key; key = Object.keys(json)[i]; i++) {
      let info = key.split('/');
      if (opt_locale && opt_locale !== info[0]) {
        continue;
      }
      if (info[1] === 'rules') {
        SpeechRuleEngine.getInstance().addStore(json[key] as RulesJson);
      } else if (info[1] === 'messages') {
        completeLocale(json[key]);
      }
      else {
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
   * @param locale The target locale.
   */
  function retrieveMaps(locale: string) {
    if (Engine.getInstance().isIE &&
      Engine.getInstance().mode === EngineConst.Mode.HTTP) {
      getJsonIE_(locale);
      return;
    }
    let file = BaseUtil.makePath(SystemExternal.jsonPath) + locale + '.json';
    let parse = parseMaps.bind(this);
    retrieveFiles(file, parse);
  }


  /**
   * Gets JSON elements from the global JSON object in case of IE browsers.
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
   * Takes path to a JSON file and returns a JSON object.
   * @param path Contains the path to a JSON file.
   * @param func Method adding the rules.
   * @return JSON.
   */
  function fromFile_(path: string, func: (p1: Error, p2: string) => any):
      string {
    return SystemExternal.fs.readFile(path, 'utf8', func);
  }


  /**
   * Loads JSON for a given file name.
   * @param file A valid filename.
   * @return A string representing a JSON array.
   */
  export function loadFile(file: string): string {
    try {
      return readJSON_(file);
    } catch (x) {
      console.error('Unable to load file: ' + file + '\n' + x);
    }
    return '{}';
  }


  /**
   * Takes path to a JSON file and returns a JSON object.
   * @param path Contains the path to a JSON file.
   * @return JSON.
   */
  function readJSON_(path: string): string {
    return SystemExternal.fs.readFileSync(path);
  }


  /**
   * Sents AJAX request to retrieve a JSON rule file.
   * @param file The file to retrieve.
   * @param parse Method adding the rules.
   */
  function getJsonAjax_(file: string, parse: (p1: string) => any) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
        MathMap.toFetch_--;
        if (httpRequest.status === 200) {
          parse(httpRequest.responseText);
        }
      }
    };
    httpRequest.open('GET', file, true);
    httpRequest.send();
  }

}

Engine.registerTest(() => MathMap.getInstance() && !MathMap.toFetch_);

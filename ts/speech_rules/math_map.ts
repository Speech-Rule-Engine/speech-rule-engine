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
import * as EngineExports from '../common/engine';
import {Engine} from '../common/engine';
import {SystemExternal} from '../common/system_external';
import {MathCompoundStore} from '../rule_engine/math_simple_store';

import * as AlphabetGenerator from './alphabet_generator';



export class MathMap {
  private static oldInst_: Function;


  /**
   * Files left to fetch in asynchronous mode.
   */
  private static toFetch_: number = 0;

  store: MathCompoundStore;

  loaded_ = [];

  addSymbols: {[key: any]: (p1: string[]) => any};
  constructor() {
    /**
     * The compund store for symbol and function mappings.
     */
    this.store = MathCompoundStore.getInstance();
    /**
     * Methods for parsing json structures.
     */
    this.addSymbols = {
      functions: goog.bind(this.store.addFunctionRules, this.store),
      symbols: goog.bind(this.store.addSymbolRules, this.store),
      units: goog.bind(this.store.addUnitRules, this.store),
      si: goog.bind(this.addSiPrefixes, this)
    };
  }


  /**
   * Adds the Si prefix mapping.
   * @param json Single dictionary object.
   */
  addSiPrefixes(json: {[key: any]: string}) {
    this.store.siPrefixes = json;
  }


  /**
   * @return The instance of the MathMap singleton.
   */
  static getInstance(): MathMap {
    let instance = MathMap.oldInst_();
    instance.loadLocale();
    return instance;
  }


  /**
   * Loads a new locale if necessary.
   */
  loadLocale() {
    let locale = Engine.getInstance().locale;
    if (this.loaded_.indexOf(locale) === -1) {
      sre.SpeechRuleEngine.getInstance().prune = true;
      this.retrieveMaps(locale);
      this.loaded_.push(locale);
    }
  }


  /**
   * Retrieves JSON rule mappings for a given locale.
   * @param file The target locale.
   * @param parse Method adding the rules.
   */
  retrieveFiles(file: string, parse: (p1: string) => any) {
    let async = Engine.getInstance().mode === EngineExports.Mode.ASYNC;
    if (async) {
      Engine.getInstance().mode = EngineExports.Mode.SYNC;
    }
    switch (Engine.getInstance().mode) {
      case EngineExports.Mode.ASYNC:
        MathMap.toFetch_++;
        MathMap.fromFile_(file, function(err, json) {
          MathMap.toFetch_--;
          if (err) {
            return;
          }
          parse(json);
        });
        break;
      case EngineExports.Mode.HTTP:
        MathMap.toFetch_++;
        MathMap.getJsonAjax_(file, parse);
        break;
      case EngineExports.Mode.SYNC:
      default:
        let strs = MathMap.loadFile(file);
        parse(strs);
        break;
    }
    if (async) {
      Engine.getInstance().mode = EngineExports.Mode.ASYNC;
    }
  }


  /**
   * Parses JSON mappings from a string and them to the MathStore.
   * @param json The json mappings string.
   */
  parseMaps(json: string) {
    let js = (JSON.parse(json) as {[key: any]: any[]});
    this.addMaps(js);
  }


  /**
   * Adds JSON mappings to the mathmap store.
   * @param json The json mappings.
   * @param opt_locale Optionally the locale for the mappings to
   *     add. This is necessary for the single IE dictionary.
   */
  addMaps(json: {[key: any]: any[]}, opt_locale?: string) {
    for (let i = 0, key; key = Object.keys(json)[i]; i++) {
      let info = key.split('/');
      if (opt_locale && opt_locale !== info[0]) {
        continue;
      }
      if (info[1] !== 'rules') {
        json[key].forEach(this.addSymbols[info[1]]);
      } else {
        sre.SpeechRuleEngine.getInstance().addStore(json[key]);
      }
    }
  }


  /**
   * Retrieves mappings and adds them to the respective stores.
   * @param locale The target locale.
   */
  retrieveMaps(locale: string) {
    AlphabetGenerator.generate(locale, this.store);
    if (Engine.getInstance().isIE &&
        Engine.getInstance().mode === EngineExports.Mode.HTTP) {
      this.getJsonIE_(locale);
      return;
    }
    let file = BaseUtil.makePath(SystemExternal.jsonPath) + locale + '.js';
    let parse = goog.bind(this.parseMaps, this);
    this.retrieveFiles(file, parse);
  }


  /**
   * Gets JSON elements from the global JSON object in case of IE browsers.
   * @param locale The target locale.
   * @param opt_count Optional counter argument for callback.
   */
  private getJsonIE_(locale: string, opt_count?: number) {
    let count = opt_count || 1;
    if (!BrowserUtil.mapsForIE) {
      if (count <= 5) {
        setTimeout(goog.bind(function() {
          this.getJsonIE_(locale, count++);
        }, this), 300);
      }
      return;
    }
    this.addMaps(BrowserUtil.mapsForIE, locale);
  }


  /**
   * Takes path to a JSON file and returns a JSON object.
   * @param path Contains the path to a JSON file.
   * @param func Method adding the rules.
   * @return JSON.
   */
  private static fromFile_(path: string, func: (p1: string, p2: string) => any):
      string {
    return SystemExternal.fs.readFile(path, 'utf8', func);
  }


  /**
   * Loads JSON for a given file name.
   * @param file A valid filename.
   * @return A string representing a JSON array.
   */
  static loadFile(file: string): string {
    try {
      return MathMap.readJSON_(file);
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
  private static readJSON_(path: string): string {
    return SystemExternal.fs.readFileSync(path);
  }


  /**
   * Sents AJAX request to retrieve a JSON rule file.
   * @param file The file to retrieve.
   * @param parse Method adding the rules.
   */
  private static getJsonAjax_(file: string, parse: (p1: string) => any) {
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

goog.addSingletonGetter(MathMap);
MathMap.oldInst_ = MathMap.getInstance;
Engine.registerTest(function() {
  return MathMap.getInstance() && !MathMap.toFetch_;
});

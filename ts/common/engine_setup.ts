//
// Copyright 2016-21 Volker Sorge
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
 * @file Functionality for setting up the engine internally.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as L10n from '../l10n/l10n';
import * as MathMap from '../speech_rules/math_map';
import * as BrowserUtil from './browser_util';
import Engine, { EnginePromise } from './engine';
import * as FileUtil from './file_util';
import SystemExternal from './system_external';

// Engine setup method.
/**
 * Method to setup and initialize the speech rule engine. Currently the
 * feature parameter is ignored, however, this could be used to fine tune the
 * setup.
 *
 * @param feature An object describing some setup features.
 * @returns The promise that resolves once setup is complete.
 */
export async function setup(feature: { [key: string]: boolean | string }) {
  const engine = Engine.getInstance() as any;
  // This preserves the possibility to specify default as domain.
  // < 3.2  this lead to the use of chromevox rules in English.
  // >= 3.2 this defaults to Mathspeak. It also ensures that in other locales
  // we get a meaningful output.
  if (
    feature.domain === 'default' &&
    (feature.modality === 'speech' ||
      !feature.modality ||
      engine.modality === 'speech')
  ) {
    feature.domain = 'mathspeak';
  }
  const setIf = (feat: string) => {
    if (typeof feature[feat] !== 'undefined') {
      engine[feat] = !!feature[feat];
    }
  };
  const setMulti = (feat: string) => {
    if (typeof feature[feat] !== 'undefined') {
      engine[feat] = feature[feat];
    }
  };
  setMulti('mode');
  engine.configurate(feature);
  Engine.BINARY_FEATURES.forEach(setIf);
  Engine.STRING_FEATURES.forEach(setMulti);
  if (feature.json) {
    SystemExternal.jsonPath = FileUtil.makePath(feature.json as string);
  }
  if (feature.xpath) {
    SystemExternal.WGXpath = feature.xpath as string;
  }
  engine.setCustomLoader(feature.custom);
  setupBrowsers(engine);
  L10n.setLocale();
  engine.setDynamicCstr();
  // We add a break in the execution flow so custom loaders can set up.
  if (engine.init) {
    EnginePromise.promises['init'] = new Promise((res, _rej) => {
      setTimeout(() => {
        res('init');
      }, 10);
    });
    engine.init = false;
    return EnginePromise.get();
  }
  if (engine.delay) {
    engine.delay = false;
    return EnginePromise.get();
  }
  return MathMap.loadLocale();
}

/**
 * Sets up browser specific functionality.
 *
 * @param engine The Engine object.
 * @deprecated
 */
function setupBrowsers(engine: Engine) {
  engine.isIE = BrowserUtil.detectIE();
  engine.isEdge = BrowserUtil.detectEdge();
}

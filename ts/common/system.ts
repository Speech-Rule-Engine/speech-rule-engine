//
// Copyright 2014-26 Volker Sorge
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
 * @file The overall system API for the Speech Rule Engine.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import { SystemExternal } from './system_external.js';
import * as EngineConst from '../common/engine_const.js';
import { Variables } from './variables.js';
import { setupEngine } from '../api/control.js';

export * from '../api/control.js';
export * from '../api/string.js';
export * from '../api/misc.js';
export * as worker from '../api/worker.js';
export * as file from '../api/file.js';

/**
 * Version number.
 */
export const version: string = Variables.VERSION;

if (SystemExternal.documentSupported || SystemExternal.webworker) {
  setupEngine({ mode: EngineConst.Mode.HTTP }).then(() => setupEngine({}));
} else {
  setupEngine({ mode: EngineConst.Mode.SYNC }).then(() =>
    setupEngine({ mode: EngineConst.Mode.ASYNC })
  );
}

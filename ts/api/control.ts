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
 * @file Basic API functionality for controlling the Speech Rule Engine.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Engine, EnginePromise } from '../common/engine.js';
import { setupEngine as setup, engineSetup as engine } from '../common/engine_setup.js';
import { standardLoader } from '../speech_rules/math_map.js';

/**
 *  Setup Methods functionality.
 */

/**
 * Method to setup and initialize the speech rule engine. Currently the
 * feature parameter is ignored, however, this could be used to fine tune the
 * setup.
 *
 * @param feature An object describing some setup features.
 * @returns The promise that resolves once setup is complete.
 */
export async function setupEngine(feature: {
  [key: string]: boolean | string;
}) {
  return setup(feature);
}

/**
 * Query the engine setup.
 *
 * @returns Object vector with all engine feature
 *     values.
 */
export function engineSetup(): { [key: string]: boolean | string } {
  return engine();
}

/**
 * Reset the engine options setup.
 */
export function resetEngine() {
  Engine.getInstance().reset();
}

/**
 * @returns True if engine is ready, i.e., unicode file for the current
 *     locale has been loaded.
 */
export async function engineReady(): Promise<any> {
  return setupEngine({}).then(() => EnginePromise.getall());
}

/**
 * Export of the standard locale loader for use in client functions.
 */
export const localeLoader = standardLoader;

/**
 * A clean exit method, that ensures all file processes are completed.
 *
 * @param opt_value The exit value. Defaults to 0.
 */
export function exit(opt_value?: number) {
  const value = opt_value || 0;
  EnginePromise.getall().then(() => process.exit(value));
}




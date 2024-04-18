//
// Copyright 2024 Volker Sorge
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
 * @file Fixed elements of the engine.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as EngineConst from './engine_const.js';

/**
 * Initializes the basic Speech engine and contains some global context.
 *
 */
export class EngineFixtures {

  // TODO (TS): Keeping this as a singleton for the time being.
  private static instance: EngineFixtures;

  /**
   * The mode in which the engine is running (sync, async, http).
   */
  public mode: EngineConst.Mode = EngineConst.Mode.SYNC;

  /**
   * Init flag, initially set true. Set to false after first setup.
   */
  public init = true;

  /**
   * Delay flag, to avoid auto setup of engine.
   */
  public delay = false;

  /**
   * Current browser is MS Internet Explorer but not Edge.
   */
  public isIE = false;

  /**
   * Current browser is MS Edge.
   */
  public isEdge = false;

  /**
   *
   */
  public rules = '';

  /**
   *
   */
  public prune = '';

  /**
   * @returns The Engine Fixtures singleton object.
   */
  public static getInstance(): EngineFixtures {
    EngineFixtures.instance = EngineFixtures.instance || new EngineFixtures();
    return EngineFixtures.instance;
  }

  /**
   * Private constructor.
   */
  private constructor() { }

}

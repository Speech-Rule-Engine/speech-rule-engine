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
 * @fileoverview Combines all implemented and available speech rules.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {ClearspeakRules} from './clearspeak_rules';
import {MathspeakRules} from './mathspeak_rules';
import {BrailleRules, OtherRules, PrefixRules} from './other_rules';


export let INIT_: boolean = false;


/**
 * Initializes the context function mappings for speech rule stores.
 */
export function init() {
  if (INIT_) {
    return;
  }
  MathspeakRules();
  ClearspeakRules();
  PrefixRules();
  OtherRules();
  BrailleRules();
  INIT_ = true;
}

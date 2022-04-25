//
// Copyright 2021-21 Volker Sorge
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
 * @file Adds context function mappings to the global store.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */

import { DynamicCstr } from '../rule_engine/dynamic_cstr';
import * as StoreUtil from '../rule_engine/store_util';

import * as ClearspeakUtil from './clearspeak_util';
import * as MathspeakUtil from './mathspeak_util';
import * as NumbersUtil from './numbers_util';
import * as SpeechRules from './speech_rules';

/**
 * Adds the custom functions for the clearspeak rules.
 */
export function ClearspeakRules() {
  // Basic English
  SpeechRules.addStore(DynamicCstr.BASE_LOCALE + '.speech.clearspeak', '', {
    CTFpauseSeparator: StoreUtil.pauseSeparator,
    CTFnodeCounter: ClearspeakUtil.nodeCounter,
    CTFcontentIterator: StoreUtil.contentIterator,
    CSFvulgarFraction: NumbersUtil.vulgarFraction,
    CQFvulgarFractionSmall: ClearspeakUtil.isSmallVulgarFraction,
    CQFcellsSimple: ClearspeakUtil.allCellsSimple,
    CSFordinalExponent: ClearspeakUtil.ordinalExponent,
    CSFwordOrdinal: ClearspeakUtil.wordOrdinal,
    CQFmatchingFences: ClearspeakUtil.matchingFences,
    CSFnestingDepth: ClearspeakUtil.nestingDepth,
    CQFfencedArguments: ClearspeakUtil.fencedArguments,
    CQFsimpleArguments: ClearspeakUtil.simpleArguments,
    CQFspaceoutNumber: MathspeakUtil.spaceoutNumber
  });
}

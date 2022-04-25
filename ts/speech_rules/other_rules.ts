//
// Copyright 2021 Volker Sorge
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
import { SpeechRuleStore } from '../rule_engine/speech_rule_store';
import * as StoreUtil from '../rule_engine/store_util';

import * as MathspeakUtil from './mathspeak_util';
import * as NemethUtil from './nemeth_util';
import * as NumbersUtil from './numbers_util';
import * as SpeechRules from './speech_rules';

/**
 * Adds the custom functions for the prefix rules.
 */
export function PrefixRules() {
  // Basic English
  SpeechRules.addStore('en.prefix.default', '', {
    CSFordinalPosition: NumbersUtil.ordinalPosition
  });
}

/**
 * Adds the custom functions for non-standard rule sets.
 */
export function OtherRules() {
  SpeechRules.addStore('en.speech.chromevox', '', {
    CTFnodeCounter: StoreUtil.nodeCounter,
    CTFcontentIterator: StoreUtil.contentIterator
  });

  SpeechRules.addStore('en.speech.emacspeak', 'en.speech.chromevox', {
    CQFvulgarFractionSmall: MathspeakUtil.isSmallVulgarFraction,
    CSFvulgarFraction: NumbersUtil.vulgarFraction
  });
}

/**
 * Adds the custom functions for the braille modality rules.
 */
export function BrailleRules() {
  // Basic Nemeth
  SpeechRules.addStore(
    'nemeth.braille.default',
    DynamicCstr.BASE_LOCALE + '.speech.mathspeak',
    {
      CSFopenFraction: NemethUtil.openingFraction,
      CSFcloseFraction: NemethUtil.closingFraction,
      CSFoverFraction: NemethUtil.overFraction,

      CSFoverBevFraction: NemethUtil.overBevelledFraction,
      // Radical function.
      CSFopenRadical: NemethUtil.openingRadical,
      CSFcloseRadical: NemethUtil.closingRadical,

      CSFindexRadical: NemethUtil.indexRadical,
      CSFsubscript: MathspeakUtil.subscriptVerbose,
      CSFsuperscript: MathspeakUtil.superscriptVerbose,

      CSFbaseline: MathspeakUtil.baselineVerbose,

      CGFtensorRules: (st: SpeechRuleStore) =>
        MathspeakUtil.generateTensorRules(st, false),
      CTFrelationIterator: NemethUtil.relationIterator,
      CTFimplicitIterator: NemethUtil.implicitIterator
    }
  );
}

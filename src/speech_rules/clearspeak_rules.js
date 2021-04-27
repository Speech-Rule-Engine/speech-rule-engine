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
 * @fileoverview Adds context function mappings to the global store.
 * @author v.sorge@mathjax.org (Volker Sorge)
 */


goog.provide('sre.ClearspeakRules');

goog.require('sre.ClearspeakUtil');
goog.require('sre.MathspeakUtil');
goog.require('sre.NumbersUtil');
goog.require('sre.SpeechRules');
goog.require('sre.StoreUtil');


/**
 * Adds the custom functions for the clearspeak rules.
 */
sre.ClearspeakRules = function() {
  // Basic English
  sre.SpeechRules.getInstance().addStore(
      'en.speech.clearspeak', '',
      {
        'CTFpauseSeparator': sre.StoreUtil.pauseSeparator,
        'CTFnodeCounter': sre.ClearspeakUtil.nodeCounter,
        'CTFcontentIterator': sre.StoreUtil.contentIterator,
        'CSFvulgarFraction': sre.NumbersUtil.vulgarFraction,
        'CQFvulgarFractionSmall': sre.ClearspeakUtil.isSmallVulgarFraction,
        'CQFcellsSimple': sre.ClearspeakUtil.allCellsSimple,
        'CSFordinalExponent': sre.ClearspeakUtil.ordinalExponent,
        'CSFwordOrdinal': sre.ClearspeakUtil.wordOrdinal,
        'CQFisCapital': sre.ClearspeakUtil.isCapitalLetter,
        'CQFmatchingFences': sre.ClearspeakUtil.matchingFences,
        'CSFnestingDepth': sre.ClearspeakUtil.nestingDepth,
        'CQFfencedArguments': sre.ClearspeakUtil.fencedArguments,
        'CQFsimpleArguments': sre.ClearspeakUtil.simpleArguments,
        'CQFisHyperbolic': sre.ClearspeakUtil.isHyperbolic,
        'CQFisLogarithm': sre.ClearspeakUtil.isLogarithmWithBase,
        'CQFspaceoutNumber': sre.MathspeakUtil.spaceoutNumber,
        // Units.
        'CQFisLengthUnit': sre.ClearspeakUtil.isLengthUnit,
        // Currency.
        'CQFfirstCurrency': sre.ClearspeakUtil.firstCurrency,
        'CQFlastCurrency': sre.ClearspeakUtil.lastCurrency
      }
  );

  // French
  sre.SpeechRules.getInstance().addStore(
      'fr.speech.clearspeak', 'en.speech.clearspeak', {});

  // German
  sre.SpeechRules.getInstance().addStore(
      'de.speech.clearspeak', 'en.speech.clearspeak', {});

};

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


goog.provide('sre.BrailleRules');
goog.provide('sre.OtherRules');
goog.provide('sre.PrefixRules');

goog.require('sre.MathspeakUtil');
goog.require('sre.NemethUtil');
goog.require('sre.NumbersUtil');
goog.require('sre.StoreUtil');



sre.PrefixRules = function() {
  // Basic English
  sre.SpeechRules.getInstance().addStore(
    'en.prefix.default', '',
    {'CSFordinalPosition': sre.NumbersUtil.ordinalPosition}
  );
};


sre.OtherRules = function() {
  sre.SpeechRules.getInstance().addStore(
    'en.speech.default', '', 
    {
      'CTFnodeCounter': sre.StoreUtil.nodeCounter,
      'CTFcontentIterator': sre.StoreUtil.contentIterator
    });

  sre.SpeechRules.getInstance().addStore(
    'en.speech.emacspeak', 'en.speech.default', 
    {
      'CQFvulgarFractionSmall': sre.MathspeakUtil.isSmallVulgarFraction,
      'CSFvulgarFraction': sre.NumbersUtil.vulgarFraction
    });

};


sre.BrailleRules = function() {

  // Basic Nemeth
  sre.SpeechRules.getInstance().addStore(
    'nemeth.braille.default', 'en.speech.mathspeak',
    {
      'CSFopenFraction': sre.NemethUtil.openingFraction,
      'CSFcloseFraction': sre.NemethUtil.closingFraction,
      'CSFoverFraction': sre.NemethUtil.overFraction,
      'CSFoverBevFraction': sre.NemethUtil.overBevelledFraction,

      // Radical function.
      'CSFopenRadicalVerbose': sre.NemethUtil.openingRadical,
      'CSFcloseRadicalVerbose': sre.NemethUtil.closingRadical,
      'CSFindexRadicalVerbose': sre.NemethUtil.indexRadical,

      'CGFtensorRules': sre.NemethUtil.generateTensorRules
    });
  
};

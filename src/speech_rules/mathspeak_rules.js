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


goog.provide('sre.MathspeakRules');

goog.require('sre.ClearspeakUtil');
goog.require('sre.MathspeakFrenchUtil');
goog.require('sre.MathspeakSpanishUtil');
goog.require('sre.MathspeakUtil');
goog.require('sre.NumbersUtil');
goog.require('sre.SpeechRules');
goog.require('sre.UnitUtil');



sre.MathspeakRules = function() {
  // Basic English
  sre.SpeechRules.getInstance().addStore(
    'en.speech.mathspeak', '',
    {
      'CQFspaceoutNumber': sre.MathspeakUtil.spaceoutNumber,
      'CQFspaceoutIdentifier': sre.MathspeakUtil.spaceoutIdentifier,

      'CSFspaceoutText': sre.MathspeakUtil.spaceoutText,
      // Fraction function.
      'CSFopenFracVerbose': sre.MathspeakUtil.openingFractionVerbose,
      'CSFcloseFracVerbose': sre.MathspeakUtil.closingFractionVerbose,
      'CSFoverFracVerbose': sre.MathspeakUtil.overFractionVerbose,
      'CSFopenFracBrief': sre.MathspeakUtil.openingFractionBrief,
      'CSFcloseFracBrief': sre.MathspeakUtil.closingFractionBrief,
      'CSFopenFracSbrief': sre.MathspeakUtil.openingFractionSbrief,
      'CSFcloseFracSbrief': sre.MathspeakUtil.closingFractionSbrief,
      'CSFoverFracSbrief': sre.MathspeakUtil.overFractionSbrief,
      'CSFvulgarFraction': sre.NumbersUtil.vulgarFraction,
      'CQFvulgarFractionSmall': sre.MathspeakUtil.isSmallVulgarFraction,

      // Radical function.
      'CSFopenRadicalVerbose': sre.MathspeakUtil.openingRadicalVerbose,
      'CSFcloseRadicalVerbose': sre.MathspeakUtil.closingRadicalVerbose,
      'CSFindexRadicalVerbose': sre.MathspeakUtil.indexRadicalVerbose,
      'CSFopenRadicalBrief': sre.MathspeakUtil.openingRadicalBrief,
      'CSFcloseRadicalBrief': sre.MathspeakUtil.closingRadicalBrief,
      'CSFindexRadicalBrief': sre.MathspeakUtil.indexRadicalBrief,
      'CSFopenRadicalSbrief': sre.MathspeakUtil.openingRadicalSbrief,
      'CSFindexRadicalSbrief': sre.MathspeakUtil.indexRadicalSbrief,

      // Sub- Superscript.
      'CSFsuperscriptVerbose': sre.MathspeakUtil.superscriptVerbose,
      'CSFsuperscriptBrief': sre.MathspeakUtil.superscriptBrief,
      'CSFsubscriptVerbose': sre.MathspeakUtil.subscriptVerbose,
      'CSFsubscriptBrief': sre.MathspeakUtil.subscriptBrief,
      'CSFbaselineVerbose': sre.MathspeakUtil.baselineVerbose,
      'CSFbaselineBrief': sre.MathspeakUtil.baselineBrief,
      // Tensor specific.
      'CSFleftsuperscriptVerbose': sre.MathspeakUtil.superscriptVerbose,
      'CSFleftsubscriptVerbose': sre.MathspeakUtil.subscriptVerbose,
      'CSFrightsuperscriptVerbose': sre.MathspeakUtil.superscriptVerbose,
      'CSFrightsubscriptVerbose': sre.MathspeakUtil.subscriptVerbose,
      'CSFleftsuperscriptBrief': sre.MathspeakUtil.superscriptBrief,
      'CSFleftsubscriptBrief': sre.MathspeakUtil.subscriptBrief,
      'CSFrightsuperscriptBrief': sre.MathspeakUtil.superscriptBrief,
      'CSFrightsubscriptBrief': sre.MathspeakUtil.subscriptBrief,

      // Over- Underscore.
      'CSFunderscript': sre.MathspeakUtil.nestedUnderscore,
      'CSFoverscript': sre.MathspeakUtil.nestedOverscore,

      'CTFordinalCounter': sre.NumbersUtil.ordinalCounter,
      'CTFcontentIterator': sre.StoreUtil.contentIterator,

      // Layout related.
      'CQFdetIsSimple': sre.MathspeakUtil.determinantIsSimple,
      'CSFRemoveParens': sre.MathspeakUtil.removeParens,

      // Dummy.
      'CQFresetNesting': sre.MathspeakUtil.resetNestingDepth,

      // Generators.
      'CGFbaselineConstraint': sre.MathspeakUtil.generateBaselineConstraint,
      'CGFtensorRules': sre.MathspeakUtil.generateTensorRules
    });

  // Spanish
  sre.SpeechRules.getInstance().addStore(
    'es.speech.mathspeak', 'en.speech.mathspeak',
    {
      'CQFisSmallRoot': sre.MathspeakSpanishUtil.smallRoot,
      'CTFordinalCounter': sre.MathspeakSpanishUtil.ordinalCounter,
      'CTFunitMultipliers': sre.UnitUtil.unitMultipliers,
      'CQFoneLeft': sre.UnitUtil.oneLeft
    });

  // French
  sre.SpeechRules.getInstance().addStore(
    'fr.speech.mathspeak', 'en.speech.mathspeak',
    {
      'CQFisSmallRoot': sre.MathspeakFrenchUtil.smallRoot,
      'CSFbaselineVerbose': sre.MathspeakFrenchUtil.baselineVerbose,
      'CSFbaselineBrief': sre.MathspeakFrenchUtil.baselineBrief,
      // Tensor specific:
      'CSFleftsuperscriptVerbose': sre.MathspeakFrenchUtil.leftSuperscriptVerbose,
      'CSFleftsubscriptVerbose': sre.MathspeakFrenchUtil.leftSubscriptVerbose,
      'CSFleftsuperscriptBrief': sre.MathspeakFrenchUtil.leftSuperscriptBrief,
      'CSFleftsubscriptBrief': sre.MathspeakFrenchUtil.leftSubscriptBrief,
      'CQFisLogarithm': sre.ClearspeakUtil.isLogarithmWithBase,
    });
  
};

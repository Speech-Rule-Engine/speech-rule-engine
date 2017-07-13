// Copyright 2016 Volker Sorge
// Copyright (c) 2016 The MathJax Consortium
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
 * @fileoverview Dummy file to pull together all the speech generators.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SpeechGeneratorFactory');

goog.require('sre.AdhocSpeechGenerator');
goog.require('sre.DirectSpeechGenerator');
goog.require('sre.DummySpeechGenerator');
goog.require('sre.NodeSpeechGenerator');
goog.require('sre.SpeechGenerator');
goog.require('sre.SummarySpeechGenerator');
goog.require('sre.TreeSpeechGenerator');


/**
 * Produces a speech generator that corresponds to the given type.
 * @param {string} type The type of speech generator.
 * @return {!sre.SpeechGenerator} The newly generated speech generator.
 */
sre.SpeechGeneratorFactory.generator = function(type) {
  var constructor = sre.SpeechGeneratorFactory.generatorMapping_[type] ||
      sre.SpeechGeneratorFactory.generatorMapping_.Direct;
  return new constructor();
};


/**
 * @type {Object.<function(new:sre.SpeechGenerator)>}
 * @private
 */
sre.SpeechGeneratorFactory.generatorMapping_ = {
  Adhoc: sre.AdhocSpeechGenerator,
  Direct: sre.DirectSpeechGenerator,
  Dummy: sre.DummySpeechGenerator,
  Node: sre.NodeSpeechGenerator,
  Summary: sre.SummarySpeechGenerator,
  Tree: sre.TreeSpeechGenerator
};

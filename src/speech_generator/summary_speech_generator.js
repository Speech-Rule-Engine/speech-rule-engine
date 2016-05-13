// Copyright 2015 Volker Sorge
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
 * @fileoverview Summary speech generator that computes speech strings a for
 *     elements in their maximally collapsed state, regardless of the actual
 *     state of rendering.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SummarySpeechGenerator');

goog.require('sre.AbstractSpeechGenerator');
goog.require('sre.EnrichMathml');



/**
 * @constructor
 * @extends {sre.AbstractSpeechGenerator}
 */
sre.SummarySpeechGenerator = function() { };
goog.inherits(sre.SummarySpeechGenerator, sre.AbstractSpeechGenerator);


/**
 * @override
 */
sre.SummarySpeechGenerator.prototype.getSpeech = function(node, xml) {
  sre.EnrichMathml.connectAllMactions(xml, this.getRebuilt().xml);
  return this.generateSpeech(node, xml);
};

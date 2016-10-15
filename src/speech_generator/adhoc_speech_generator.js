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
 * @fileoverview Ad hoc speech generator that computes a new speech string for
 *     an element, non-recursively, every time.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AdhocSpeechGenerator');

goog.require('sre.AbstractSpeechGenerator');
goog.require('sre.EnrichMathml.Attribute');



/**
 * @constructor
 * @extends {sre.AbstractSpeechGenerator}
 */
sre.AdhocSpeechGenerator = function() {
  sre.AdhocSpeechGenerator.base(this, 'constructor');
};
goog.inherits(sre.AdhocSpeechGenerator, sre.AbstractSpeechGenerator);


/**
 * @override
 */
sre.AdhocSpeechGenerator.prototype.getSpeech = function(node, xml) {
  var speech = this.generateSpeech(node, xml);
  node.setAttribute(sre.EnrichMathml.Attribute.SPEECH, speech);
  return speech;
};

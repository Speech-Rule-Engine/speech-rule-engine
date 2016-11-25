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
 * @fileoverview Dummy speech generator that rebuilds the semantic tree and
 *     connects mactions, but always returns the empty speech string.
 *
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.DummySpeechGenerator');

goog.require('sre.AbstractSpeechGenerator');



/**
 * @constructor
 * @extends {sre.AbstractSpeechGenerator}
 */
sre.DummySpeechGenerator = function() {
  sre.DummySpeechGenerator.base(this, 'constructor');
};
goog.inherits(sre.DummySpeechGenerator, sre.AbstractSpeechGenerator);


/**
 * @override
 */
sre.DummySpeechGenerator.prototype.getSpeech = function(node, xml) {
  return '';
};

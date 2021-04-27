// Copyright 2015-21 Volker Sorge
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
 * @fileoverview Node speech generator that computes a new speech string for a
 *     single node and its subtree, if it does not yet have a speech string
 *     attached.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.NodeSpeechGenerator');

goog.require('sre.TreeSpeechGenerator');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @extends {sre.TreeSpeechGenerator}
 */
sre.NodeSpeechGenerator = function() {
  sre.NodeSpeechGenerator.base(this, 'constructor');
};
goog.inherits(sre.NodeSpeechGenerator, sre.TreeSpeechGenerator);


/**
 * @override
 */
sre.NodeSpeechGenerator.prototype.getSpeech = function(node, xml) {
  var speech = sre.WalkerUtil.getAttribute(node, this.modality);
  if (speech) return speech;
  return sre.NodeSpeechGenerator.base(this, 'getSpeech', node, xml);
};

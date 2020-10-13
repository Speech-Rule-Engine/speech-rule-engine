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
 * @fileoverview Tree speech generator that computes speech strings for
 *     elements of an entire expression tree, even if it has already speech
 *     strings attached.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.TreeSpeechGenerator');

goog.require('sre.AbstractSpeechGenerator');
goog.require('sre.SpeechGeneratorUtil');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @extends {sre.AbstractSpeechGenerator}
 */
sre.TreeSpeechGenerator = function() {
  sre.TreeSpeechGenerator.base(this, 'constructor');
};
goog.inherits(sre.TreeSpeechGenerator, sre.AbstractSpeechGenerator);


/**
 * @override
 */
sre.TreeSpeechGenerator.prototype.getSpeech = function(node, xml) {
  var speech = this.generateSpeech(node, xml);
  node.setAttribute(this.modality, speech);
  var nodes = this.getRebuilt().nodeDict;
  for (var key in nodes) {
    //TODO: Refactor with setting the base semantic tree in the enrich mathml
    //      object.
    var snode = nodes[key];
    var innerMml = /** @type {Element} */(
        sre.WalkerUtil.getBySemanticId(xml, key));
    var innerNode = /** @type {Element} */(
        sre.WalkerUtil.getBySemanticId(node, key));
    if (!innerMml || !innerNode) continue;
    sre.SpeechGeneratorUtil.addSpeech(innerNode, snode, this.modality);
    if (this.modality === sre.EnrichMathml.Attribute.SPEECH) {
      sre.SpeechGeneratorUtil.addPrefix(innerNode, snode);
    }
  }
  return speech;
};

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
 * @fileoverview Abstract speech generator for classes that work on the rebuilt
 *     semantic tree.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractSpeechGenerator');

goog.require('sre.AuditoryDescription');
goog.require('sre.DirectSpeechGenerator');
goog.require('sre.EnrichMathml');
goog.require('sre.RebuildStree');



/**
 * @constructor
 * @extends {sre.DirectSpeechGenerator}
 */
sre.AbstractSpeechGenerator = function() {
  goog.base(this);

  /**
   * @type {sre.RebuildStree}
   */
  this.rebuilt = null;
};
goog.inherits(sre.AbstractSpeechGenerator, sre.DirectSpeechGenerator);


/**
 * Rebuilds the semantic tree given in the input xml element fully connected
 * with maction elements.
 * @param {!Node} node The target element of the event.
 * @param {!Element} xml The base xml element belonging to node.
 */
sre.AbstractSpeechGenerator.prototype.rebuildStree = function(node, xml) {
  this.rebuilt = new sre.RebuildStree(xml);
  sre.EnrichMathml.connectMactions(node, xml, this.rebuilt.xml);
};


/**
 * Generates speech string for a sub tree of the xml element.
 * @param {!Node} node The target element of the event.
 * @param {!Element} xml The base xml element belonging to node.
 * @return {string} The generated speech string.
 */
sre.AbstractSpeechGenerator.prototype.generateSpeech = function(node, xml) {
  this.rebuildStree(node, xml);
  var descrs = sre.EnrichMathml.computeSpeech(this.rebuilt.xml);
  return sre.AuditoryDescription.speechString(descrs);
};

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
 *     an element if no speech attribute is available.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AdhocSpeechGenerator');

goog.require('sre.AbstractSpeechGenerator');
goog.require('sre.EnrichMathml');
goog.require('sre.WalkerUtil');



/**
 * @constructor
 * @extends {sre.AbstractSpeechGenerator}
 */
sre.AdhocSpeechGenerator = function() {
  goog.base(this);
};
goog.inherits(sre.AdhocSpeechGenerator, sre.AbstractSpeechGenerator);


/**
 * @override
 */
sre.AdhocSpeechGenerator.prototype.getSpeech = function(node, xml) {
  if (!node) return '';
  console.log(typeof xml);
  console.log(xml);
  var speech = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.SPEECH);
  if (speech) return speech;
  sre.SpeechRuleEngine.getInstance().clearCache();
  console.log('here');
  console.log(node);
  console.log(xml);

  
  var id = sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.ID);
  console.log(id);
  var doc = xml.parentNode ? xml.parentNode : xml;
  var innerXml = id ? sre.WalkerUtil.getBySemanticId(doc, id) : xml;
  console.log(innerXml);
  
  // speech = sre.System.getInstance().toSpeech(xml.toString());
  // See getSemanticTree_ , currently http only!
  var stree = sre.Semantic.getTree(innerXml).childNodes[0];
  console.log(stree);
  // Same as processXml_
  var descrs = sre.SpeechRuleEngine.getInstance().evaluateNode(stree);
  speech = sre.AuditoryDescription.toSimpleString(descrs);
  //xml.setAttribute(sre.EnrichMathml.Attribute.SPEECH, speech);
  console.log(speech);
  node.setAttribute(sre.EnrichMathml.Attribute.SPEECH, speech);
  //return sre.WalkerUtil.getAttribute(node, sre.EnrichMathml.Attribute.SPEECH);
  return speech;
};

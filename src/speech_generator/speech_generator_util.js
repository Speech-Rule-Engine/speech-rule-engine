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
 * @fileoverview Utility functions for speech generators.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SpeechGeneratorUtil');

goog.require('sre.AuralRendering');
goog.require('sre.DomUtil');
goog.require('sre.EnrichMathml.Attribute');
goog.require('sre.SemanticTree');
goog.require('sre.SpeechRuleEngine');
goog.require('sre.WalkerUtil');
goog.require('sre.XpathUtil');


/**
 * Compute speech string for the xml version of the semantic tree.
 * @param {!Node} xml The xml element.
 * @return {!Array.<sre.AuditoryDescription>} A list of auditory descriptions
 *     for the node.
 */
sre.SpeechGeneratorUtil.computeSpeech = function(xml) {
  return sre.SpeechRuleEngine.getInstance().evaluateNode(xml);
};


/**
 * Computes speech descriptions for a single semantic node.
 * @param {!sre.SemanticNode} semantic The semantic tree node.
 * @return {!Array.<sre.AuditoryDescription>} A list of auditory descriptions
 *     for the node.
 */
sre.SpeechGeneratorUtil.recomputeSpeech = function(semantic) {
  var tree = sre.SemanticTree.fromNode(semantic);
  return sre.SpeechGeneratorUtil.computeSpeech(tree.xml());
};


/**
 * Computes speech markup for the xml version of the semantic tree.
 * @param {!Node} tree The semantic node as XML.
 * @return {string} The speech string.
 */
sre.SpeechGeneratorUtil.computeMarkup = function(tree) {
  var descrs = sre.SpeechGeneratorUtil.computeSpeech(tree);
  return sre.AuralRendering.getInstance().markup(descrs);
};


/**
 * Computes speech markup for a single semantic node.
 * @param {!sre.SemanticNode} semantic The semantic tree node.
 * @return {string} The speech string.
 */
sre.SpeechGeneratorUtil.recomputeMarkup = function(semantic) {
  var descrs = sre.SpeechGeneratorUtil.recomputeSpeech(semantic);
  return sre.AuralRendering.getInstance().markup(descrs);
};


/**
 * Add speech as a semantic attributes in a MathML node.
 * @param {!Element} mml The MathML node.
 * @param {!sre.SemanticNode} semantic The semantic tree node.
 * @param {!Node} snode The XML node representing the semantic tree.
 */
sre.SpeechGeneratorUtil.addSpeech = function(mml, semantic, snode) {
  let sxml = sre.DomUtil.querySelectorAllByAttrValue(
      snode, 'id', semantic.id.toString())[0];
  var speech = sxml ?
      sre.AuralRendering.getInstance().markup(
      sre.SpeechGeneratorUtil.computeSpeech(sxml)) :
      sre.SpeechGeneratorUtil.recomputeMarkup(semantic);
  mml.setAttribute(sre.EnrichMathml.Attribute.SPEECH, speech);
};


/**
 * Add markup for the given modality (generally other than speech) in a MathML
 * node.
 * @param {!Element} mml The MathML node.
 * @param {!sre.SemanticNode} semantic The semantic tree node.
 * @param {string} modality The speech modality.
 */
sre.SpeechGeneratorUtil.addModality = function(mml, semantic, modality) {
  var markup = sre.SpeechGeneratorUtil.recomputeMarkup(semantic);
  mml.setAttribute(modality, markup);
};


/**
 * Adds a speech prefix if necessary.
 * @param {!Element} mml The MathML node.
 * @param {!sre.SemanticNode} semantic The semantic tree node.
 */
sre.SpeechGeneratorUtil.addPrefix = function(mml, semantic) {
  var speech = sre.SpeechGeneratorUtil.retrievePrefix(semantic);
  if (speech) mml.setAttribute(sre.EnrichMathml.Attribute.PREFIX, speech);
};


/**
 * Computes a speech prefix if it exists.
 * @param {!sre.SemanticNode} semantic The semantic tree node.
 * @return {string} The prefix speech string.
 */
sre.SpeechGeneratorUtil.retrievePrefix = function(semantic) {
  var descrs = sre.SpeechGeneratorUtil.computePrefix_(semantic);
  return sre.AuralRendering.getInstance().markup(descrs);
};


/**
 * Adds a speech prefix if necessary.
 * @param {!sre.SemanticNode} semantic The semantic tree node.
 * @return {!Array.<sre.AuditoryDescription>} A list of auditory descriptions
 *     for the prefix.
 * @private
 */
sre.SpeechGeneratorUtil.computePrefix_ = function(semantic) {
  var tree = sre.SemanticTree.fromRoot(semantic);
  var nodes = sre.XpathUtil.evalXPath('.//*[@id="' + semantic.id + '"]',
                                      tree.xml());
  var node = nodes[0];
  if (nodes.length > 1) {
    // Find the node we actually want. Here the problem is that our semantic
    // tree is actually a DAG: While elements can appear as children only once,
    // they can appear in multiple content nodes. XML serialization can
    // therefore not create unique ids.
    node = sre.SpeechGeneratorUtil.nodeAtPosition_(semantic, nodes) || node;
  }
  return node ?
      sre.SpeechRuleEngine.getInstance().runInSetting(
      {'modality': 'prefix', 'domain': 'default', 'style': 'default',
        'strict': true, 'speech': true},
      function() {return sre.SpeechRuleEngine.getInstance().evaluateNode(node);}
      ) :
      [];
};


/**
 * Finds the nodes at the same position as the semantic node in a list of XML
 * nodes. We define position via the path to root.
 * @param {!sre.SemanticNode} semantic The semantic tree node.
 * @param {!Array.<Element>} nodes The XML nodes.
 * @return {Element} The node at the exact tree position of the semantic node.
 * @private
 */
sre.SpeechGeneratorUtil.nodeAtPosition_ = function(semantic, nodes) {
  var node = nodes[0];
  if (!semantic.parent) {
    return node;
  }
  var path = [];
  while (semantic) {
    path.push(semantic.id);
    semantic = semantic.parent;
  }
  var pathEquals = function(xml, path) {
    while (path.length && path.shift().toString() === xml.getAttribute('id') &&
           xml.parentNode && xml.parentNode.parentNode) {
      xml = xml.parentNode.parentNode;
    }
    return !path.length;
  };
  for (var i = 0, xml; xml = nodes[i]; i++) {
    if (pathEquals(xml, path.slice())) {
      return xml;
    }
  }
  return node;
};


/**
 * Connects maction nodes as alternatives if they are collapsed in the actual
 * node.
 * @param {!Node} node The actual DOM node.
 * @param {!Element} mml The mathml element for the node.
 * @param {!Node} stree The XML for the semantic tree.
 */
sre.SpeechGeneratorUtil.connectMactions = function(node, mml, stree) {
  var mactions = sre.DomUtil.querySelectorAll(mml, 'maction');
  for (var i = 0, maction; maction = mactions[i]; i++) {
    // Get the span with the maction id in node.
    var aid = maction.getAttribute('id');
    var span = sre.DomUtil.querySelectorAllByAttrValue(node, 'id', aid)[0];
    if (!span) continue;
    // Get id of uncollapse maction child.
    var lchild = maction.childNodes[1];
    var mid = lchild.getAttribute(sre.EnrichMathml.Attribute.ID);
    // Find the corresponding span in node.
    var cspan = sre.WalkerUtil.getBySemanticId(node, mid);
    // If the span exists, the maction is not collapsed and does not need to be
    // connected. Unless, it is collapsed maction (dummy type) and has been
    // previously linked into the span. Then we still want to mark it as
    // alternative.
    if (cspan &&
        cspan.getAttribute(sre.EnrichMathml.Attribute.TYPE) !== 'dummy')
      continue;
    // Otherwise, we take the existing child, which is actually the collapsed
    // maction that needs to be linked into the node.
    cspan = span.childNodes[0];
    // If this node was already a highlighting rect we ignore it. This means
    // some other walker has introduced it already (e.g. in MJ3).
    if (cspan.getAttribute('sre-highlighter-added')) {
      continue;
    }
    // Set parent pointer if necessary.
    var pid = lchild.getAttribute(sre.EnrichMathml.Attribute.PARENT);
    if (pid) {
      cspan.setAttribute(sre.EnrichMathml.Attribute.PARENT, pid);
    }
    // Set dummy type and id.
    cspan.setAttribute(sre.EnrichMathml.Attribute.TYPE, 'dummy');
    cspan.setAttribute(sre.EnrichMathml.Attribute.ID, mid);
    // Indicate the alternative in the semantic tree.
    var cst = sre.DomUtil.querySelectorAllByAttrValue(stree, 'id', mid)[0];
    cst.setAttribute('alternative', mid);
  }
};


/**
 * Connects all maction nodes as alternatives.
 * @param {!Element} mml The mathml element.
 * @param {!Node} stree The XML for the semantic tree.
 */
sre.SpeechGeneratorUtil.connectAllMactions = function(mml, stree) {
  var mactions = sre.DomUtil.querySelectorAll(mml, 'maction');
  for (var i = 0, maction; maction = mactions[i]; i++) {
    var lchild = maction.childNodes[1];
    var mid = lchild.getAttribute(sre.EnrichMathml.Attribute.ID);
    var cst = sre.DomUtil.querySelectorAllByAttrValue(stree, 'id', mid)[0];
    cst.setAttribute('alternative', mid);
  }
};


/**
 * Computes a speech summary if it exists.
 * @param {Node} node The XML node.
 * @return {string} The summary speech string.
 */
sre.SpeechGeneratorUtil.retrieveSummary = function(node) {
  var descrs = sre.SpeechGeneratorUtil.computeSummary_(node);
  return sre.AuralRendering.getInstance().markup(descrs);
};


/**
 * Adds a speech summary if necessary.
 * @param {Node} node The XML node.
 * @return {!Array.<sre.AuditoryDescription>} A list of auditory descriptions
 *     for the summary.
 * @private
 */
sre.SpeechGeneratorUtil.computeSummary_ = function(node) {
  return node ?
      sre.SpeechRuleEngine.getInstance().runInSetting(
      {'modality': 'summary', 'strict': false, 'speech': true},
      function() {return sre.SpeechRuleEngine.getInstance().evaluateNode(node);}
      ) :
      [];
};

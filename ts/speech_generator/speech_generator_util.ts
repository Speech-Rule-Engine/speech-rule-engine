//
// Copyright 2016-21 Volker Sorge
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


import {AuditoryDescription} from '../audio/auditory_description';
import AuralRendering from '../audio/aural_rendering';
import * as DomUtil from '../common/dom_util';
import XpathUtil from '../common/xpath_util';
import {Attribute} from '../enrich_mathml/enrich_mathml';
import {SpeechRuleEngine} from '../rule_engine/speech_rule_engine';
import {SemanticNode} from '../semantic_tree/semantic_node';
import {SemanticTree} from '../semantic_tree/semantic_tree';
import * as WalkerUtil from '../walker/walker_util';


/**
 * Compute speech string for the xml version of the semantic tree.
 * @param xml The xml element.
 * @return A list of auditory descriptions
 *     for the node.
 */
export function computeSpeech(xml: Element): AuditoryDescription[] {
  return SpeechRuleEngine.getInstance().evaluateNode(xml);
}


/**
 * Computes speech descriptions for a single semantic node.
 * @param semantic The semantic tree node.
 * @return A list of auditory descriptions
 *     for the node.
 */
export function recomputeSpeech(semantic: SemanticNode): AuditoryDescription[] {
  let tree = SemanticTree.fromNode(semantic);
  return computeSpeech(tree.xml());
}


/**
 * Computes speech markup for the xml version of the semantic tree.
 * @param tree The semantic node as XML.
 * @return The speech string.
 */
export function computeMarkup(tree: Element): string {
  let descrs = computeSpeech(tree);
  return AuralRendering.markup(descrs);
}


/**
 * Computes speech markup for a single semantic node.
 * @param semantic The semantic tree node.
 * @return The speech string.
 */
export function recomputeMarkup(semantic: SemanticNode): string {
  let descrs = recomputeSpeech(semantic);
  return AuralRendering.markup(descrs);
}


/**
 * Add speech as a semantic attributes in a MathML node.
 * @param mml The MathML node.
 * @param semantic The semantic tree node.
 * @param snode The XML node representing the semantic tree.
 */
export function addSpeech(mml: Element, semantic: SemanticNode, snode: Element) {
  let sxml = DomUtil.querySelectorAllByAttrValue(
      snode, 'id', semantic.id.toString())[0];
  let speech = sxml ? AuralRendering.markup(computeSpeech(sxml)) :
                      recomputeMarkup(semantic);
  mml.setAttribute(Attribute.SPEECH, speech);
}


/**
 * Add markup for the given modality (generally other than speech) in a MathML
 * node.
 * @param mml The MathML node.
 * @param semantic The semantic tree node.
 * @param modality The speech modality.
 */
export function addModality(
    mml: Element, semantic: SemanticNode, modality: string) {
  let markup = recomputeMarkup(semantic);
  mml.setAttribute(modality, markup);
}


/**
 * Adds a speech prefix if necessary.
 * @param mml The MathML node.
 * @param semantic The semantic tree node.
 */
export function addPrefix(mml: Element, semantic: SemanticNode) {
  let speech = retrievePrefix(semantic);
  if (speech) {
    mml.setAttribute(Attribute.PREFIX, speech);
  }
}


/**
 * Computes a speech prefix if it exists.
 * @param semantic The semantic tree node.
 * @return The prefix speech string.
 */
export function retrievePrefix(semantic: SemanticNode): string {
  let descrs = computePrefix_(semantic);
  return AuralRendering.markup(descrs);
}


/**
 * Adds a speech prefix if necessary.
 * @param semantic The semantic tree node.
 * @return A list of auditory descriptions
 *     for the prefix.
 */
export function computePrefix_(semantic: SemanticNode): AuditoryDescription[] {
  let tree = SemanticTree.fromRoot(semantic);
  let nodes =
      XpathUtil.evalXPath('.//*[@id="' + semantic.id + '"]', tree.xml()) as Element[];
  let node = nodes[0];
  if (nodes.length > 1) {
    // Find the node we actually want. Here the problem is that our semantic
    // tree is actually a DAG: While elements can appear as children only once,
    // they can appear in multiple content nodes. XML serialization can
    // therefore not create unique ids.
    node = nodeAtPosition_(semantic, nodes) || node;
  }
  return node ? SpeechRuleEngine.getInstance().runInSetting(
                    {
                      'modality': 'prefix',
                      'domain': 'default',
                      'style': 'default',
                      'strict': true,
                      'speech': true
                    },
                    function() {
                      return SpeechRuleEngine.getInstance().evaluateNode(node);
                    }) :
                [];
}
/**
 * Finds the nodes at the same position as the semantic node in a list of XML
 * nodes. We define position via the path to root.
 * @param semantic The semantic tree node.
 * @param nodes The XML nodes.
 * @return The node at the exact tree position of the semantic node.
 */
export function nodeAtPosition_(
    semantic: SemanticNode, nodes: Element[]): Element {
  let node = nodes[0];
  if (!semantic.parent) {
    return node;
  }
  let path = [];
  while (semantic) {
    path.push(semantic.id);
    semantic = semantic.parent;
  }
  let pathEquals = function(xml: Element, path: number[]) {
    while (path.length && path.shift().toString() === xml.getAttribute('id') &&
           xml.parentNode && xml.parentNode.parentNode) {
      xml = xml.parentNode.parentNode as Element;
    }
    return !path.length;
  };
  for (let i = 0, xml; xml = nodes[i]; i++) {
    if (pathEquals(xml, path.slice())) {
      return xml;
    }
  }
  return node;
}


/**
 * Connects maction nodes as alternatives if they are collapsed in the actual
 * node.
 * @param node The actual DOM node.
 * @param mml The mathml element for the node.
 * @param stree The XML for the semantic tree.
 */
export function connectMactions(node: Element, mml: Element, stree: Element) {
  let mactions = DomUtil.querySelectorAll(mml, 'maction');
  for (let i = 0, maction; maction = mactions[i]; i++) {
    // Get the span with the maction id in node.
    let aid = maction.getAttribute('id');
    let span = DomUtil.querySelectorAllByAttrValue(node, 'id', aid)[0];
    if (!span) {
      continue;
    }
    // Get id of uncollapse maction child.
    let lchild = maction.childNodes[1] as Element;
    let mid = lchild.getAttribute(Attribute.ID);
    // Find the corresponding span in node.
    let cspan = WalkerUtil.getBySemanticId(node, mid);
    // If the span exists, the maction is not collapsed and does not need to be
    // connected. Unless, it is collapsed maction (dummy type) and has been
    // previously linked into the span. Then we still want to mark it as
    // alternative.
    if (cspan && cspan.getAttribute(Attribute.TYPE) !== 'dummy') {
      continue;
    }
    // Otherwise, we take the existing child, which is actually the collapsed
    // maction that needs to be linked into the node.
    cspan = span.childNodes[0] as Element;
    // If this node was already a highlighting rect we ignore it. This means
    // some other walker has introduced it already (e.g. in MJ3).
    if (cspan.getAttribute('sre-highlighter-added')) {
      continue;
    }
    // Set parent pointer if necessary.
    let pid = lchild.getAttribute(Attribute.PARENT);
    if (pid) {
      cspan.setAttribute(Attribute.PARENT, pid);
    }
    // Set dummy type and id.
    cspan.setAttribute(Attribute.TYPE, 'dummy');
    cspan.setAttribute(Attribute.ID, mid);
    // Indicate the alternative in the semantic tree.
    let cst = DomUtil.querySelectorAllByAttrValue(stree, 'id', mid)[0];
    cst.setAttribute('alternative', mid);
  }
}


/**
 * Connects all maction nodes as alternatives.
 * @param mml The mathml element.
 * @param stree The XML for the semantic tree.
 */
export function connectAllMactions(mml: Element, stree: Element) {
  let mactions = DomUtil.querySelectorAll(mml, 'maction');
  for (let i = 0, maction; maction = mactions[i]; i++) {
    let lchild = maction.childNodes[1] as Element;
    let mid = lchild.getAttribute(Attribute.ID);
    let cst = DomUtil.querySelectorAllByAttrValue(stree, 'id', mid)[0];
    cst.setAttribute('alternative', mid);
  }
}


/**
 * Computes a speech summary if it exists.
 * @param node The XML node.
 * @return The summary speech string.
 */
export function retrieveSummary(node: Element): string {
  let descrs = computeSummary_(node);
  return AuralRendering.markup(descrs);
}


/**
 * Adds a speech summary if necessary.
 * @param node The XML node.
 * @return A list of auditory descriptions
 *     for the summary.
 */
export function computeSummary_(node: Element): AuditoryDescription[] {
  return node ? SpeechRuleEngine.getInstance().runInSetting(
                    {'modality': 'summary', 'strict': false, 'speech': true},
                    function() {
                      return SpeechRuleEngine.getInstance().evaluateNode(node);
                    }) :
                [];
}

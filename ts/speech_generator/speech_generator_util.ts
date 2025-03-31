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
 * @file Utility functions for speech generators.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AuditoryDescription } from '../audio/auditory_description.js';
import * as AuralRendering from '../audio/aural_rendering.js';
import * as DomUtil from '../common/dom_util.js';
import * as XpathUtil from '../common/xpath_util.js';
import { Attribute } from '../enrich_mathml/enrich_attr.js';
import { SpeechRuleEngine } from '../rule_engine/speech_rule_engine.js';
import { SpeechStructure } from '../rule_engine/speech_structure.js';
import { SemanticRole } from '../semantic_tree/semantic_meaning.js';
import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { SemanticTree } from '../semantic_tree/semantic_tree.js';
import * as WalkerUtil from '../walker/walker_util.js';
import * as EngineConst from '../common/engine_const.js';
import { ClearspeakPreferences } from '../speech_rules/clearspeak_preferences.js';
// import { RebuildStree } from '../walker/rebuild_stree.js';

type OptionsList = { [key: string]: string };


/**
 * Compute speech string for the xml version of the semantic tree.
 *
 * @param xml The xml element.
 * @param clear If the speech structure is to be cleared in the engine.
 * @returns A list of auditory descriptions
 *     for the node.
 */
export function computeSpeech(xml: Element, clear = false): AuditoryDescription[] {
  const result = SpeechRuleEngine.getInstance().evaluateNode(xml, clear);
  return result;
}

/**
 * Computes speech descriptions for a single semantic node.
 *
 * @param semantic The semantic tree node.
 * @returns A list of auditory descriptions
 *     for the node.
 */
function recomputeSpeech(semantic: SemanticNode): AuditoryDescription[] {
  const tree = SemanticTree.fromNode(semantic);
  return computeSpeech(tree.xml());
}

/**
 * Computes speech markup for the xml version of the semantic tree.
 *
 * @param tree The semantic node as XML.
 * @param clear If the speech structure is to be cleared in the engine.
 * @returns The speech string.
 */
export function computeMarkup(tree: Element, clear = false): string {
  const descrs = computeSpeech(tree, clear);
  return AuralRendering.markup(descrs);
}

/**
 * Computes speech markup for a single semantic node.
 *
 * @param semantic The semantic tree node.
 * @returns The speech string.
 */
export function recomputeMarkup(semantic: SemanticNode): string {
  const descrs = recomputeSpeech(semantic);
  return AuralRendering.markup(descrs);
}

/**
 * Add speech as a semantic attributes in a MathML node.
 *
 * @param mml The MathML node.
 * @param semantic The semantic tree node.
 * @param snode The XML node representing the semantic tree.
 */
export function addSpeech(
  mml: Element,
  semantic: SemanticNode,
  snode: Element
) {
  const sxml = DomUtil.querySelectorAllByAttrValue(
    snode,
    'id',
    semantic.id.toString()
  )[0];
  const speech = sxml
    ? AuralRendering.markup(computeSpeech(sxml))
    : recomputeMarkup(semantic);
  mml.setAttribute(Attribute.SPEECH, speech);
}

/**
 * Add markup for the given modality (generally other than speech) in a MathML
 * node.
 *
 * @param mml The MathML node.
 * @param semantic The semantic tree node.
 * @param modality The speech modality.
 */
export function addModality(
  mml: Element,
  semantic: SemanticNode,
  modality: string
) {
  const markup = recomputeMarkup(semantic);
  mml.setAttribute(modality, markup);
}

/**
 * Adds a speech prefix if necessary.
 *
 * @param mml The MathML node.
 * @param semantic The semantic tree node.
 */
export function addPrefix(mml: Element, semantic: SemanticNode) {
  const speech = retrievePrefix(semantic);
  if (speech) {
    mml.setAttribute(Attribute.PREFIX, speech);
  }
}

/**
 * Computes a speech prefix if it exists.
 *
 * @param semantic The semantic tree node.
 * @returns The prefix speech string.
 */
export function retrievePrefix(semantic: SemanticNode): string {
  const node = computePrefixNode(semantic);
  const descrs = computePrefix(node);
  return AuralRendering.markup(descrs);
}

/**
 * Computes prefix speech.
 *
 * @param xml The xml element.
 * @returns A list of auditory descriptions for the prefix.
 */
export function computePrefix(node: Element): AuditoryDescription[] {
  return node
    ? SpeechRuleEngine.getInstance().runInSetting(
        {
          modality: 'prefix',
          domain: 'default',
          style: 'default',
          strict: true,
          speech: true
        },
        function () {
          return SpeechRuleEngine.getInstance().evaluateNode(node);
        }
      )
    : [];
}

/**
 * Computes the exact XML node from a semantic node for which a prefix is to be
 * computed.
 *
 * @param semantic The semantic tree node.
 * @returns An XML node corresponding to the tree node.
 */
function computePrefixNode(semantic: SemanticNode): Element {
  const tree = SemanticTree.fromRoot(semantic);
  const nodes = XpathUtil.evalXPath(
    './/*[@id="' + semantic.id + '"]',
    tree.xml()
  ) as Element[];
  let node = nodes[0];
  if (nodes.length > 1) {
    // Find the node we actually want. Here the problem is that our semantic
    // tree is actually a DAG: While elements can appear as children only once,
    // they can appear in multiple content nodes. XML serialization can
    // therefore not create unique ids.
    node = nodeAtPosition(semantic, nodes) || node;
  }
  return node;
}

/**
 * Finds the nodes at the same position as the semantic node in a list of XML
 * nodes. We define position via the path to root.
 *
 * @param semantic The semantic tree node.
 * @param nodes The XML nodes.
 * @returns The node at the exact tree position of the semantic node.
 */
function nodeAtPosition(semantic: SemanticNode, nodes: Element[]): Element {
  const node = nodes[0];
  if (!semantic.parent) {
    return node;
  }
  const path = [];
  while (semantic) {
    path.push(semantic.id);
    semantic = semantic.parent;
  }
  const pathEquals = function (xml: Element, path: number[]) {
    while (
      path.length &&
      path.shift().toString() === xml.getAttribute('id') &&
      xml.parentNode &&
      xml.parentNode.parentNode
    ) {
      xml = xml.parentNode.parentNode as Element;
    }
    return !path.length;
  };
  for (let i = 0, xml; (xml = nodes[i]); i++) {
    if (pathEquals(xml, path.slice())) {
      return xml;
    }
  }
  return node;
}

/**
 * Connects maction nodes as alternatives if they are collapsed in the actual
 * node.
 *
 * @param node The actual DOM node.
 * @param mml The mathml element for the node.
 * @param stree The XML for the semantic tree.
 */
export function connectMactions(node: Element, mml: Element, stree: Element) {
  const mactions = DomUtil.querySelectorAll(mml, 'maction');
  for (let i = 0, maction; (maction = mactions[i]); i++) {
    // Get the span with the maction id in node.
    const aid = maction.getAttribute('id');
    const span = DomUtil.querySelectorAllByAttrValue(node, 'id', aid)[0];
    if (!span) {
      continue;
    }
    // Get id of uncollapse maction child.
    const lchild = maction.childNodes[1] as Element;
    const mid = lchild.getAttribute(Attribute.ID);
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
    const pid = lchild.getAttribute(Attribute.PARENT);
    if (pid) {
      cspan.setAttribute(Attribute.PARENT, pid);
    }
    // Set dummy type and id.
    cspan.setAttribute(Attribute.TYPE, 'dummy');
    cspan.setAttribute(Attribute.ID, mid);
    cspan.setAttribute('role', 'treeitem');
    cspan.setAttribute('aria-level', lchild.getAttribute('aria-level'));
    // Indicate the alternative in the semantic tree.
    const cst = DomUtil.querySelectorAllByAttrValue(stree, 'id', mid)[0];
    cst.setAttribute('alternative', mid);
  }
}


enum NeededAttributes {
  ID = 'data-semantic-id',
  PARENT = 'data-semantic-parent',
  LEVEL = 'aria-level',
  POS = 'aria-posinset',
  ROLE = 'role',
}

function getNeededAttributes(stree: Element) {
  const result: {[K in NeededAttributes]?: string} = {}
  for (let [,attr] of Object.entries(NeededAttributes)) {
    result[attr] = stree.getAttribute(attr);
  }
  return result;
}

/**
 * Connects maction nodes as alternatives if they are collapsed in the actual
 * node.
 *
 * @param mml The mathml element for the node.
 * @param stree The XML for the semantic tree.
 * @returns Mapping for semantic and aria attributes missing on mactions.
 */
export function connectMactionSelections(mml: Element, stree: Element) {
  const mactions = DomUtil.querySelectorAll(mml, 'maction');
  const results: {[key: string]: {[K in NeededAttributes]?: string}} = {};
  for (let i = 0, maction; (maction = mactions[i]); i++) {
    // Get the span with the maction id in node.
    const selection = parseInt(maction.getAttribute('selection'));
    const children = Array.from(maction.childNodes);
    const semantic = children.filter(child =>
      (child as Element).hasAttribute(NeededAttributes.ID))[0] as Element;
    const selected = children[selection - 1];
    if (!semantic || semantic === selected) {
      continue;
    }
    const mid = semantic.getAttribute(Attribute.ID);
    const cst = DomUtil.querySelectorAllByAttrValue(stree, 'id', mid)[0];
    cst.setAttribute('alternative', mid);
    results[maction.getAttribute('id')] = getNeededAttributes(semantic);
  }
  return results;
}

/**
 * Connects all maction nodes as alternatives.
 *
 * @param mml The mathml element.
 * @param stree The XML for the semantic tree.
 */
export function connectAllMactions(mml: Element, stree: Element) {
  const mactions = DomUtil.querySelectorAll(mml, 'maction');
  for (let i = 0, maction; (maction = mactions[i]); i++) {
    const lchild = maction.childNodes[1] as Element;
    const mid = lchild.getAttribute(Attribute.ID);
    const cst = DomUtil.querySelectorAllByAttrValue(stree, 'id', mid)[0];
    cst.setAttribute('alternative', mid);
  }
}

/**
 * Computes a speech summary if it exists.
 *
 * @param node The XML node.
 * @returns The summary speech string.
 */
export function retrieveSummary(
  node: Element,
  options: OptionsList = {}): string {
  const descrs = computeSummary(node, options);
  return AuralRendering.markup(descrs);
}

/**
 * Adds a speech summary if necessary.
 *
 * @param node The XML node.
 * @returns A list of auditory descriptions
 *     for the summary.
 */
export function computeSummary(
  node: Element,
  options: OptionsList = {}): AuditoryDescription[] {
  const preOption = options.locale ? { locale: options.locale } : {};
  return node
    ? SpeechRuleEngine.getInstance().runInSetting(
        Object.assign(preOption, {
          modality: 'summary',
          strict: false,
          speech: true
        }),
        function () {
          return SpeechRuleEngine.getInstance().evaluateNode(node);
        }
      )
    : [];
}

/**
 * Adds a speech summary if necessary.
 *
 * @param node The XML node.
 * @returns A list of auditory descriptions
 *     for the summary.
 */
export function computePostfix(node: Element): AuditoryDescription[] {
  // TODO: Maybe add personality.
  const postfix = [];
  if (node.getAttribute('role') === SemanticRole.MGLYPH) {
    postfix.push(new AuditoryDescription({text: 'image', personality: {}}));
  }
  if (node.hasAttribute('href')) {
    postfix.push(new AuditoryDescription({text: 'link', personality: {}}));
  }
  // TODO: This is trickery. Make that cleaner.
  SpeechRuleEngine.getInstance().speechStructure.addNode(node, postfix, 'postfix');
  return postfix;
}


// Changes for the webworker

export function completeModalities(structure: SpeechStructure) {
  structure.completeModality('speech', computeSpeech);
  structure.completeModality('prefix', computePrefix);
  structure.completeModality('postfix', computePostfix);
  structure.completeModality('summary', computeSummary);
}


export function computeSpeechStructure(sxml: Element) {
  computeSpeech(sxml, true);
  const structure = SpeechRuleEngine.getInstance().speechStructure;
  completeModalities(structure);
  return structure.json(['none', 'ssml']);
}

export function computeBrailleStructure(sxml: Element) {
  computeSpeech(sxml, true);
  const structure = SpeechRuleEngine.getInstance().speechStructure;
  return structure.json(['none']);
}

/**
 *
 * @param options
 */
export function nextRules(options: OptionsList): OptionsList {
  // Rule cycling only makes sense for speech modality.
  if (options.modality !== 'speech') {
    return options;
  }
  const prefs = ClearspeakPreferences.getLocalePreferences();
  if (!prefs[options.locale]) {
    return options;
  }
  EngineConst.DOMAIN_TO_STYLES[options.domain] = options.style;
  options.domain =
    options.domain === 'mathspeak' ? 'clearspeak' : 'mathspeak';
  options.style = EngineConst.DOMAIN_TO_STYLES[options.domain];
  return options;
}

/**
 * Cycles to next style or preference of the speech rule set if possible.
 *
 * @param node The semantic node currently in focus.
 * @returns The new style name.
 */
export function nextStyle(node: SemanticNode, options: OptionsList) {
  const {modality: modality, domain: domain, style: style} = options;
  // Rule cycling only makes sense for speech modality.
  if (modality !== 'speech') {
    return style;
  }

  if (domain === 'mathspeak') {
    const styles = ['default', 'brief', 'sbrief'];
    const index = styles.indexOf(style);
    if (index === -1) {
      return style;
    }
    return index >= styles.length - 1 ? styles[0] : styles[index + 1];
  }
  if (domain === 'clearspeak') {
    const prefs = ClearspeakPreferences.getLocalePreferences();
    const loc = prefs['en'];
    // TODO: use correct locale.
    if (!loc) {
      return 'default';
    }
    // TODO: return the previous one?
    const smart = ClearspeakPreferences.relevantPreferences(node);
    const current = ClearspeakPreferences.findPreference(style, smart);
    const options = loc[smart].map(function (x) {
      return x.split('_')[1];
    });
    const index = options.indexOf(current);
    if (index === -1) {
      return style;
    }
    const next =
      index >= options.length - 1 ? options[0] : options[index + 1];
    const result = ClearspeakPreferences.addPreference(style, smart, next);
    return result;
  }
  return style;
}

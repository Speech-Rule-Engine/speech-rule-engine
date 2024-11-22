//
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
 * @file Tree speech generator that computes speech strings for
 *     elements of an entire expression tree, even if it has already speech
 *     strings attached.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Attribute } from '../enrich_mathml/enrich_attr.js';
import * as WalkerUtil from '../walker/walker_util.js';

import { AbstractSpeechGenerator } from './abstract_speech_generator.js';
import * as SpeechGeneratorUtil from './speech_generator_util.js';

import { SpeechRuleEngine } from '../rule_engine/speech_rule_engine.js';
import * as AuralRendering from '../audio/aural_rendering.js';
import * as DomUtil from '../common/dom_util.js';

export class TreeSpeechGenerator extends AbstractSpeechGenerator {
  /**
   * @override
   */
  public getSpeech(node: Element, xml: Element, root: Element = null) {
    if (this.getRebuilt()) {
      SpeechGeneratorUtil.connectMactions(node, xml, this.getRebuilt().xml);
    }
    const speech = this.generateSpeech(node, xml);
    const nodes = this.getRebuilt().nodeDict;
    for (const [key, snode] of Object.entries(nodes)) {
      // TODO: Refactor with setting the base semantic tree in the enrich mathml
      //      object.
      const innerMml = WalkerUtil.getBySemanticId(xml, key) as Element;
      const innerNode =
        (WalkerUtil.getBySemanticId(node, key) as Element) ||
        // This takes care of broken elements due to linebreaks.
        ((root && WalkerUtil.getBySemanticId(root, key)) as Element);
      if (!innerMml || !innerNode) {
        continue;
      }
      if (!this.modality || this.modality === Attribute.SPEECH) {
        SpeechGeneratorUtil.addSpeech(innerNode, snode, this.getRebuilt().xml);
      } else {
        SpeechGeneratorUtil.addModality(innerNode, snode, this.modality);
      }
      if (this.modality === Attribute.SPEECH) {
        SpeechGeneratorUtil.addPrefix(innerNode, snode);
      }
    }
    return speech;
  }

  public getSpeechStructure(node: Element, xml: Element) {
    if (this.getRebuilt()) {
      SpeechGeneratorUtil.connectMactions(node, xml, this.getRebuilt().xml);
    }
    const structure: {[id: string]: {
    speech?: string,
    prefix?: string,
    postfix?: string,
    }} = {};
    this.generateSpeech(node, xml);
    const nodeMap: Map<string, Element> = new Map();
    const nodes = this.getRebuilt().nodeDict;
    console.log(5);
    console.log(Object.keys(nodes));
    const xmlDoc = DomUtil.parseInput('<stree></stree>');
    const missing = [];
    for (const [id, node] of Object.entries(nodes)) {
      let descr = SpeechRuleEngine.getInstance().speechMappings.get(id);
      const xmlNode = node.xml(xmlDoc.ownerDocument)
      xmlDoc.appendChild(xmlNode);
      nodeMap.set(id, xmlNode);
      if (!descr) {
        console.log('NO DESCR: ' + id);
        missing.push(id);
        continue;
      }
        console.log('DESCR' + id);
      structure[id] = {
        speech: AuralRendering.finalize(AuralRendering.markup(descr))
      };
    }
    console.log(missing);
    for (const node of missing) {
      structure[node] = {
        speech: AuralRendering.finalize(
          SpeechGeneratorUtil.computeMarkup(nodeMap.get(node)))
      }
    }
    return structure;
  }

}

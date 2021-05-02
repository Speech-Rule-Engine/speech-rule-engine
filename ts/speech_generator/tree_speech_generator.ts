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
 * @fileoverview Tree speech generator that computes speech strings for
 *     elements of an entire expression tree, even if it has already speech
 *     strings attached.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import * as EnrichMathml from '../enrich_mathml/enrich_mathml';
import * as WalkerUtil from '../walker/walker_util';

import {AbstractSpeechGenerator} from './abstract_speech_generator';
import * as SpeechGeneratorUtil from './speech_generator_util';


export class TreeSpeechGenerator extends AbstractSpeechGenerator {

  /**
   * @override
   */
  public getSpeech(node: Element, xml: Element) {
    let speech = this.generateSpeech(node, xml);
    node.setAttribute(this.modality, speech);
    let nodes = this.getRebuilt().nodeDict;
    for (let key in nodes) {
      // TODO: Refactor with setting the base semantic tree in the enrich mathml
      //      object.
      let snode = nodes[key];
      let innerMml = (WalkerUtil.getBySemanticId(xml, key) as Element);
      let innerNode = (WalkerUtil.getBySemanticId(node, key) as Element);
      if (!innerMml || !innerNode) {
        continue;
      }
      if (!this.modality ||
          this.modality === EnrichMathml.Attribute.SPEECH) {
        SpeechGeneratorUtil.addSpeech(innerNode, snode, this.getRebuilt().xml);
      } else {
        SpeechGeneratorUtil.addModality(innerNode, snode, this.modality);
      }
      if (this.modality === EnrichMathml.Attribute.SPEECH) {
        SpeechGeneratorUtil.addPrefix(innerNode, snode);
      }
    }
    return speech;
  }
}

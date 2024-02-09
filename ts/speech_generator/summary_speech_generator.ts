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
 * @file Summary speech generator that computes speech strings a for
 *     elements in their maximally collapsed state, regardless of the actual
 *     state of rendering.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AbstractSpeechGenerator } from './abstract_speech_generator.js';
import * as SpeechGeneratorUtil from './speech_generator_util.js';
import { setup as EngineSetup } from '../common/engine_setup.js';
import { Attribute } from '../enrich_mathml/enrich_attr.js';

export class SummarySpeechGenerator extends AbstractSpeechGenerator {

  /**
   * @override
   */
  public getSpeech(node: Element, _xml: Element) {
    // SpeechGeneratorUtil.connectAllMactions(xml, this.getRebuilt().xml);
    EngineSetup(this.getOptions());
    const id = node.getAttribute(Attribute.ID);
    const snode =
      this.getRebuilt().streeRoot.querySelectorAll(x => x.id.toString() === id)[0];
    SpeechGeneratorUtil.addModality(node, snode, this.modality);
    const speech = node.getAttribute(Attribute.SUMMARY);
    return speech;
  }

}

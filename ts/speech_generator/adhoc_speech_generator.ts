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
 * @file Ad hoc speech generator that computes a new speech string for
 *     an element, non-recursively, every time.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AbstractSpeechGenerator } from './abstract_speech_generator.js';

export class AdhocSpeechGenerator extends AbstractSpeechGenerator {
  /**
   * @override
   */
  public getSpeech(node: Element, xml: Element) {
    const speech = this.generateSpeech(node, xml);
    node.setAttribute(this.modality, speech);
    return speech;
  }
}

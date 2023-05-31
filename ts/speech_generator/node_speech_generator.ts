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
 * @file Node speech generator that computes a new speech string for a
 *     single node and its subtree, if it does not yet have a speech string
 *     attached.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import * as WalkerUtil from '../walker/walker_util.js';

import { TreeSpeechGenerator } from './tree_speech_generator.js';

export class NodeSpeechGenerator extends TreeSpeechGenerator {
  /**
   * @override
   */
  public getSpeech(node: Element, _xml: Element) {
    super.getSpeech(node, _xml);
    return WalkerUtil.getAttribute(node, this.modality);
  }
}

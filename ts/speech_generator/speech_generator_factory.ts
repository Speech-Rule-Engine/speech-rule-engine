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
 * @file Dummy file to pull together all the speech generators.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AdhocSpeechGenerator } from './adhoc_speech_generator.js';
import { ColorGenerator } from './color_generator.js';
import { DirectSpeechGenerator } from './direct_speech_generator.js';
import { DummySpeechGenerator } from './dummy_speech_generator.js';
import { NodeSpeechGenerator } from './node_speech_generator.js';
import { SpeechGenerator } from './speech_generator.js';
import { SummarySpeechGenerator } from './summary_speech_generator.js';
import { TreeSpeechGenerator } from './tree_speech_generator.js';

/**
 * Produces a speech generator that corresponds to the given type.
 *
 * @param type The type of speech generator.
 * @returns The newly generated speech generator.
 */
export function generator(type: string): SpeechGenerator {
  const constructor = generatorMapping[type] || generatorMapping.Direct;
  return constructor();
}

const generatorMapping: { [key: string]: () => SpeechGenerator } = {
  Adhoc: () => new AdhocSpeechGenerator(),
  Color: () => new ColorGenerator(),
  Direct: () => new DirectSpeechGenerator(),
  Dummy: () => new DummySpeechGenerator(),
  Node: () => new NodeSpeechGenerator(),
  Summary: () => new SummarySpeechGenerator(),
  Tree: () => new TreeSpeechGenerator()
};

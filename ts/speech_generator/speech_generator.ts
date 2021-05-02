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
 * @fileoverview Interface for Math Speech Generators.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {AxisMap} from '../rule_engine/dynamic_cstr';
import {RebuildStree} from '../walker/rebuild_stree';


export interface SpeechGenerator {
  /**
   * Returns the speech string for math node.
   * @param node The target element of the event.
   * @param xml The base xml element belonging to node.
   * @return The speech string computed for this element.
   */
  getSpeech(node: Element, xml: Element): string;


  /**
   * Returns the semantic tree rebuilt from the base xml element.
   * @return The reconstructed semantic tree.
   */
  getRebuilt(): RebuildStree;


  /**
   * Sets the rebuilt semantic tree object of the speech generator.
   * @param rebuilt The reconstructed semantic tree.
   */
  setRebuilt(rebuilt: RebuildStree): void;


  /**
   * Sets dynamic constraint options for the speech engine.
   * @param options The dynamic constraint.
   */
  setOptions(options: AxisMap): void;


  /**
   * @return Dynamic constraint options of the generator.
   */
  getOptions(): AxisMap;


  /**
   * Sets up or resets the speech generator.
   */
  start(): void;


  /**
   * Cleans up after ending speech generation.
   */
  end(): void;
}

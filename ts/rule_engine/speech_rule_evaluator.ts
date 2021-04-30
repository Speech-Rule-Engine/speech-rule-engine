//
// Copyright 2013 Google Inc.
// Copyright 2014-21 Volker Sorge
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
 * @fileoverview Interface definition for a class which evaluates speech rules.
 *
 * A speech rule evaluator knows how to generate a description given a node and
 * a speech rule.
 * @author dtseng@google.com (David Tseng)
 */

import {AuditoryDescription} from '../audio/auditory_description';


export interface SpeechRuleEvaluator {

  /**
   * Default evaluation of a node if no speech rule is applicable.
   * @param node The target node (or root of subtree).
   * @return The resulting description.
   */
  evaluateDefault(node: Element): void;

  /**
   * Default evaluation of a whitespace string.
   * @param str The string.
   * @return The resulting description.
   */
  evaluateWhitespace(str: string): AuditoryDescription[];

  /**
   * Default evaluation of a string string.
   * @param str The string.
   * @return The resulting description.
   */
  evaluateString(str: string): AuditoryDescription[];

  /**
   * Custom evaluation of a string.
   * @param str The string.
   * @return The resulting description.
   */
  evaluateCustom(str: string): AuditoryDescription[];

  /**
   * Default evaluation of a character.
   * @param chr The character.
   * @return The resulting description.
   */
  evaluateCharacter(str: string): AuditoryDescription[];

}

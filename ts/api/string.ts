//
// Copyright 2014-26 Volker Sorge
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
 * @file API functions for string to speech interface.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { AuditoryDescription } from '../audio/auditory_description.js';
import { processString } from '../common/processor_factory.js';

// Naming convention:
// Input is either an XML expression as a string or from a file.
// Output:
//  toSpeech: Aural rendering string.
//  toSemantic: XML of semantic tree.
//  toJson: Json version of the semantic tree.
//  toEnriched: Enriched MathML node.
//  toDescription: List of auditory descriptions.
// Output for the file version are strings.
// TODO: (sorge) Need an async versions of these.
/**
 * Main function to translate expressions into auditory descriptions.
 *
 * @param expr Processes a given XML expression for translation.
 * @returns The aural rendering of the expression.
 */
export function toSpeech(expr: string): string {
  return processString('speech', expr);
}

/**
 * Function to translate MathML string into Semantic Tree.
 *
 * @param expr Processes a given MathML expression for translation.
 * @returns The semantic tree as Xml.
 */
export function toSemantic(expr: string): Node {
  return processString('semantic', expr);
}

/**
 * Function to translate MathML string into JSON version of the Semantic Tree.
 *
 * @param expr Processes a given MathML expression for translation.
 * @returns The semantic tree as Json.
 */
// TODO (TS): Define the correct JSONType somewhere.
export function toJson(expr: string): any {
  return processString('json', expr);
}

/**
 * Translate input expression into JSON version of the Semantic Tree that
 * serializes the content nodes.
 *
 * @param expr Processes a given MathML expression for translation.
 * @returns The semantic tree as Json.
 */
export function toVis(expr: string): any {
  return processString('vis', expr);
}

/**
 * Main function to translate expressions into auditory descriptions.
 *
 * @param expr Processes a given Xml expression for translation.
 * @returns The auditory descriptions.
 */
export function toDescription(expr: string): AuditoryDescription[] {
  return processString('description', expr);
}

/**
 * Function to translate MathML string into semantically enriched MathML.
 *
 * @param expr Processes a given MathML expression for translation.
 * @returns The enriched MathML node.
 */
export function toEnriched(expr: string): Element {
  return processString('enriched', expr);
}

/**
 * Function to translate expression into speech structure, with all speech
 * components for all nodes.
 *
 * @param expr Processes a given MathML expression for translation.
 * @returns The json structure containing all speech mappings.
 */
export function toSpeechStructure(expr: string): string {
  return processString('speechStructure', expr);
}

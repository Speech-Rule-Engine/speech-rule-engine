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
 * @file A factory for generating walkers.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { Highlighter } from '../highlighter/highlighter.js';
import { SpeechGenerator } from '../speech_generator/speech_generator.js';

import { DummyWalker } from './dummy_walker.js';
import { SemanticWalker } from './semantic_walker.js';
import { SyntaxWalker } from './syntax_walker.js';
import { TableWalker } from './table_walker.js';
import { Walker } from './walker.js';

/**
 * Produces a walker that corresponds to the given type.
 *
 * @param type The type of walker.
 * @param node The (rendered) node on which the walker is called.
 * @param generator The speech generator for
 *     this walker.
 * @param highlighter The currently active
 *     highlighter.
 * @param xml The original xml/mathml node on which the walker is
 *      called as a string.
 * @returns The newly generated walker.
 */
export function walker(
  type: string,
  node: Element,
  generator: SpeechGenerator,
  highlighter: Highlighter,
  xml: string
): Walker {
  const constructor =
    walkerMapping[type.toLowerCase()] || walkerMapping['dummy'];
  return constructor(node, generator, highlighter, xml);
}

const walkerMapping: {
  [key: string]: (
    p1: Element,
    p2: SpeechGenerator,
    p3: Highlighter,
    p4: string
  ) => Walker;
} = {
  dummy: (p1: Element, p2: SpeechGenerator, p3: Highlighter, p4: string) =>
    new DummyWalker(p1, p2, p3, p4),
  semantic: (p1: Element, p2: SpeechGenerator, p3: Highlighter, p4: string) =>
    new SemanticWalker(p1, p2, p3, p4),
  syntax: (p1: Element, p2: SpeechGenerator, p3: Highlighter, p4: string) =>
    new SyntaxWalker(p1, p2, p3, p4),
  table: (p1: Element, p2: SpeechGenerator, p3: Highlighter, p4: string) =>
    new TableWalker(p1, p2, p3, p4)
};
// This is temporary.

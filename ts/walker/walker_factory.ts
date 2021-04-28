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
 * @fileoverview A factory for generating walkers.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


import {Highlighter} from '../highlighter/highlighter';
import {SpeechGenerator} from '../speech_generator/speech_generator';

import {DummyWalker} from './dummy_walker';
import {SemanticWalker} from './semantic_walker';
import {SyntaxWalker} from './syntax_walker';
import {TableWalker} from './table_walker';
import * as WalkerExports from './walker';
import {Walker} from './walker';


/**
 * Produces a walker that corresponds to the given type.
 * @param type The type of walker.
 * @param node The (rendered) node on which the walker is called.
 * @param generator The speech generator for
 *     this walker.
 * @param highlighter The currently active
 *     highlighter.
 * @param xml The original xml/mathml node on which the walker is
 *      called as a string.
 * @return The newly generated walker.
 */
export function walker(
    type: string, node: Node, generator: SpeechGenerator,
    highlighter: Highlighter, xml: string): Walker {
  let constructor =
      walkerMapping_[type.toLowerCase()] || walkerMapping_['dummy'];
  return new constructor(node, generator, highlighter, xml);
}


export const walkerMapping_: {
  [key: string]: (p1: Node, p2: SpeechGenerator, p3: Highlighter, p4: string) =>
      any
} = {
  'dummy': DummyWalker,
  'semantic': SemanticWalker,
  'syntax': SyntaxWalker,
  'table': TableWalker
};
// This is temporary.

//
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
 * @file A factory for semantic heuristics. Effectively a mapping to
 * functions that can optionally be run.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {
  SemanticHeuristic,
  SemanticHeuristicTypes
} from './semantic_heuristic.js';
import { SemanticNodeFactory } from './semantic_node_factory.js';

export const SemanticHeuristics = {

  factory: null as SemanticNodeFactory,

  /**
   * Updates the semantic node factory.
   *
   * @param nodeFactory The new semantic node factory.
   */
  updateFactory: function(nodeFactory: SemanticNodeFactory) {
    SemanticHeuristics.factory = nodeFactory;
  },

  heuristics: new Map<string,
    SemanticHeuristic<SemanticHeuristicTypes>>(),

/**
 * Heuristics that are run by default.
 */
  flags: {
    combine_juxtaposition: true,
    convert_juxtaposition: true,
    multioperator: true
  } as  { [key: string]: boolean },

  /**
   * Heuristics that are permanently switched off.
   */
  blacklist: {} as { [key: string]: boolean },

  /**
   * Register a heuristic with the handler.
   *
   * @param heuristic The heuristic.
   */
  add: function(heuristic: SemanticHeuristic<SemanticHeuristicTypes>) {
    const name = heuristic.name;
    SemanticHeuristics.heuristics.set(name, heuristic);
    // Registered switched off, unless it is set by default.
    if (!SemanticHeuristics.flags[name]) {
      SemanticHeuristics.flags[name] = false;
    }
  },

  /**
   * Runs a heuristic if its predicate evaluates to true.
   *
   * @param name The name of the heuristic.
   * @param root The root node of the subtree.
   * @param opt_alternative An
   *       optional method to run if the heuristic is not applicable.
   * @returns The resulting subtree.
   */
  run: function(
    name: string,
    root: SemanticHeuristicTypes,
    opt_alternative?: (p1: SemanticHeuristicTypes) => SemanticHeuristicTypes
  ): SemanticHeuristicTypes | void {
    const heuristic = SemanticHeuristics.heuristics.get(name);
    return heuristic &&
      !SemanticHeuristics.blacklist[name] &&
      (SemanticHeuristics.flags[name] || heuristic.applicable(root))
      ? heuristic.apply(root)
      : opt_alternative
      ? opt_alternative(root)
      : root;
  }

}

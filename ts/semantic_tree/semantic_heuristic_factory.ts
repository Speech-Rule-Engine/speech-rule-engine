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
 * @fileoverview A factory for semantic heuristics. Effectively a mapping to
 * functions that can optionally be run.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticHeuristic, SemanticHeuristicTypes } from './semantic_heuristic';
import { SemanticNodeFactory } from './semantic_node_factory';

export let factory: SemanticNodeFactory = null;

/**
 * Updates the semantic node factory.
 * @param nodeFactory The new semantic node factory.
 */
export function updateFactory(nodeFactory: SemanticNodeFactory) {
  factory = nodeFactory;
}

const heuristics: Map<
  string,
SemanticHeuristic<SemanticHeuristicTypes>
  > = new Map();

/**
 * Heuristics that are run by default.
 */
export const flags: { [key: string]: boolean } = {
  combine_juxtaposition: true,
  convert_juxtaposition: true,
  multioperator: true
};

/**
 * Heuristics that are permanently switched off.
 */
export const blacklist: { [key: string]: boolean } = {};

/**
 * Register a heuristic with the handler.
 * @param name The name of the heuristic.
 * @param heuristic The heuristic.
 */
export function add(
  heuristic: SemanticHeuristic<SemanticHeuristicTypes>
) {
  let name = heuristic.name;
  heuristics.set(name, heuristic);
  // Registered switched off, unless it is set by default.
  if (!flags[name]) {
    flags[name] = false;
  }
}

/**
 * Runs a heuristic if its predicate evaluates to true.
 * @param name The name of the heuristic.
 * @param root The root node of the subtree.
 * @param opt_alternative An
 *       optional method to run if the heuristic is not applicable.
 * @return The resulting subtree.
 */
export function run(
  name: string,
  root: SemanticHeuristicTypes,
  opt_alternative?: (p1: SemanticHeuristicTypes) => SemanticHeuristicTypes
): SemanticHeuristicTypes | void {
  const heuristic = lookup(name);
  return heuristic &&
    !blacklist[name] &&
    (flags[name] || heuristic.applicable(root))
    ? heuristic.apply(root)
    : opt_alternative
    ? opt_alternative(root)
    : root;
}

/**
 * Looks up the named heuristic.
 * @param name The name of the heuristic.
 * @return The heuristic.
 */
export function lookup(
  name: string
): SemanticHeuristic<SemanticHeuristicTypes> {
  return heuristics.get(name);
}



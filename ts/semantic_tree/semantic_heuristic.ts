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
 * @file Classes for optional semantic heuristics that can be called
 *     depending on the setting of the semantic pattern recognition.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticNode } from './semantic_node.js';
import { SemanticOptions } from './semantic_options.js';

export declare type SemanticHeuristicTypes = SemanticNode | SemanticNode[];

// TODO: Heuristic paths have to be included in the tests.
/**
 * All heuristic methods get a method to manipulate nodes and have a predicate
 * that either switches them on automatically (e.g., on selection of a domain),
 * or they can be switched on manually via a flag. Currently these flags are
 * hard coded.
 */
export interface SemanticHeuristic<T> {
  name: string;

  apply: (options: SemanticOptions, node: T) => void;

  applicable: (node: T) => boolean;
}

abstract class SemanticAbstractHeuristic<T extends SemanticHeuristicTypes>
  implements SemanticHeuristic<T>
{
  public apply: (options: SemanticOptions, node: T) => void;

  public applicable: (_node: T) => boolean;

  /**
   * Abstract class of heuristics.
   *
   * @param name The name of the heuristic.
   * @param method The method of the heuristic
   * @param predicate The predicate to determine applicability of the heuristic.
   */
  constructor(
    public name: string,
    method: (options: SemanticOptions, node: T) => void,
    predicate: (node: T) => boolean = (_x: T) => false
  ) {
    this.apply = method;
    this.applicable = predicate;
  }
}

/**
 * Heuristics work on the root of a subtree.
 *
 * @override
 */
export class SemanticTreeHeuristic extends SemanticAbstractHeuristic<SemanticNode> {}

/**
 * Heuristics work on a list of nodes.
 *
 * @override
 */
export class SemanticMultiHeuristic extends SemanticAbstractHeuristic<
  SemanticNode[]
> {}

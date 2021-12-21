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
 * @file Procedure for special case in semantic enrichment of MathML.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticNode } from '../semantic_tree/semantic_node';

export interface EnrichCase {
  /**
   * Retrieves the MathML node that is the result of the computation.
   *
   * @returns The enriched MathML node.
   */
  getMathml(): Element;
}

export interface Case {
  test: (p1: SemanticNode) => boolean;
  constr: (p1: SemanticNode) => EnrichCase;
}

/**
 * Returns the embellished case analysis.
 *
 * @param node The semantic node.
 * @returns The case analysis.
 */
export function getCase(node: SemanticNode): EnrichCase {
  for (let i = 0, enrich; (enrich = factory[i]); i++) {
    if (enrich.test(node)) {
      return enrich.constr(node);
    }
  }
  return null;
}

/**
 * The cases of the factory can provide.
 */
export const factory: Case[] = [];

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
 * @fileoverview Factory class for executing case splits.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import {SemanticNode} from '../semantic_tree/semantic_node';

import {AbstractEnrichCase} from './abstract_enrich_case';
import {EnrichCase} from './enrich_case';



export class EnrichCaseFactory {
  /**
   * The cases of the factory can provide.
   */
  static cases: EnrichCaseFactory.Case[] = [];


  /**
   * Returns the embellished case analysis.
   * @param node The semantic node.
   * @return The case analysis.
   */
  static getCase(node: SemanticNode): EnrichCase {
    for (let i = 0, enrich; enrich = EnrichCaseFactory.cases[i]; i++) {
      if (enrich.test(node)) {
        return new enrich.constr(node);
      }
    }
    return null;
  }
}
export interface Case {
  test: (p1: SemanticNode) => boolean;
  constr: (p1: SemanticNode) => any;
}
export {EnrichCaseFactory};

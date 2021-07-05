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
import {CaseBinomial} from './case_binomial';
import {CaseDoubleScript} from './case_double_script';
import {CaseEmbellished} from './case_embellished';
import {CaseLimit} from './case_limit';
import {CaseLine} from './case_line';
import {CaseMultiscripts} from './case_multiscripts';
import {CaseProof} from './case_proof';
import {CaseTable} from './case_table';
import {CaseTensor} from './case_tensor';
import {CaseText} from './case_text';
import {EnrichCase} from './enrich_case';


namespace EnrichCaseFactory {

  /**
   * The cases of the factory can provide.
   */
  const cases: Case[] = [
    {test: CaseLimit.test,
     constr: (node: SemanticNode) => new CaseLimit(node)},
    {test: CaseEmbellished.test,
     constr: (node: SemanticNode) => new CaseEmbellished(node)},
    {test: CaseDoubleScript.test,
     constr: (node: SemanticNode) => new CaseDoubleScript(node)},
    {test: CaseTensor.test,
     constr: (node: SemanticNode) => new CaseTensor(node)},
    {test: CaseMultiscripts.test,
     constr: (node: SemanticNode) => new CaseMultiscripts(node)},
    {test: CaseLine.test,
     constr: (node: SemanticNode) => new CaseLine(node)},
    {test: CaseBinomial.test,
     constr: (node: SemanticNode) => new CaseBinomial(node)},
    {test: CaseProof.test,
     constr: (node: SemanticNode) => new CaseProof(node)},
    {test: CaseTable.test,
     constr: (node: SemanticNode) => new CaseTable(node)},
    {test: CaseText.test,
     constr: (node: SemanticNode) => new CaseText(node)}
  ];


  /**
   * Returns the embellished case analysis.
   * @param node The semantic node.
   * @return The case analysis.
   */
  export function getCase(node: SemanticNode): EnrichCase {
    for (let i = 0, enrich; enrich = cases[i]; i++) {
      if (enrich.test(node)) {
        return enrich.constr(node);
      }
    }
    return null;
  }

}

interface Case {
  test: (p1: SemanticNode) => boolean;
  constr: (p1: SemanticNode) => EnrichCase;
}

export default EnrichCaseFactory;

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
 * @file Factory class for executing case splits.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

import { SemanticNode } from '../semantic_tree/semantic_node.js';
import { CaseBinomial } from './case_binomial.js';
import { CaseDoubleScript } from './case_double_script.js';
import { CaseEmbellished } from './case_embellished.js';
import { CaseEmpheq } from './case_empheq.js';
import { CaseLimit } from './case_limit.js';
import { CaseLine } from './case_line.js';
import { CaseMultiscripts } from './case_multiscripts.js';
import { CaseProof } from './case_proof.js';
import { CaseTable } from './case_table.js';
import { CaseTensor } from './case_tensor.js';
import { CaseText } from './case_text.js';
import { factory } from './enrich_case.js';

/**
 * The cases of the factory can provide.
 */
factory.push(
  ...[
    {
      test: CaseLimit.test,
      constr: (node: SemanticNode) => new CaseLimit(node)
    },
    {
      test: CaseEmbellished.test,
      constr: (node: SemanticNode) => new CaseEmbellished(node)
    },
    {
      test: CaseDoubleScript.test,
      constr: (node: SemanticNode) => new CaseDoubleScript(node)
    },
    {
      test: CaseTensor.test,
      constr: (node: SemanticNode) => new CaseTensor(node)
    },
    {
      test: CaseMultiscripts.test,
      constr: (node: SemanticNode) => new CaseMultiscripts(node)
    },
    { test: CaseLine.test, constr: (node: SemanticNode) => new CaseLine(node) },
    {
      test: CaseBinomial.test,
      constr: (node: SemanticNode) => new CaseBinomial(node)
    },
    {
      test: CaseProof.test,
      constr: (node: SemanticNode) => new CaseProof(node)
    },
    {
      test: CaseEmpheq.test,
      constr: (node: SemanticNode) => new CaseEmpheq(node)
    },
    {
      test: CaseTable.test,
      constr: (node: SemanticNode) => new CaseTable(node)
    },
    { test: CaseText.test, constr: (node: SemanticNode) => new CaseText(node) }
  ]
);

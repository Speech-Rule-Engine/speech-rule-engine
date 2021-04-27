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
 * @fileoverview Populates the case factory with case analysis classes.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


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
import {EnrichCaseFactory} from './enrich_case_factory';



export class EnrichCases {}


EnrichCaseFactory.cases.push(
    {test: CaseLimit.test, constr: CaseLimit},
    {test: CaseEmbellished.test, constr: CaseEmbellished},
    {test: CaseDoubleScript.test, constr: CaseDoubleScript},
    {test: CaseTensor.test, constr: CaseTensor},
    {test: CaseMultiscripts.test, constr: CaseMultiscripts},
    {test: CaseLine.test, constr: CaseLine},
    {test: CaseBinomial.test, constr: CaseBinomial},
    {test: CaseProof.test, constr: CaseProof},
    {test: CaseTable.test, constr: CaseTable},
    {test: CaseText.test, constr: CaseText});

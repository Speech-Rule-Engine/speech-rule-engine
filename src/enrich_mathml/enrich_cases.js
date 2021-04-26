// Copyright 2015 Volker Sorge
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

goog.provide('sre.EnrichCases');

goog.require('sre.CaseBinomial');
goog.require('sre.CaseDoubleScript');
goog.require('sre.CaseEmbellished');
goog.require('sre.CaseLimit');
goog.require('sre.CaseLine');
goog.require('sre.CaseMultiscripts');
goog.require('sre.CaseProof');
goog.require('sre.CaseTable');
goog.require('sre.CaseTensor');
goog.require('sre.CaseText');
goog.require('sre.EnrichCaseFactory');



/**
 * @constructor
 */
sre.EnrichCases = function() { };


sre.EnrichCaseFactory.cases.push(
    {test: sre.CaseLimit.test,
      constr: sre.CaseLimit},
    {test: sre.CaseEmbellished.test,
      constr: sre.CaseEmbellished},
    {test: sre.CaseDoubleScript.test,
      constr: sre.CaseDoubleScript},
    {test: sre.CaseTensor.test,
      constr: sre.CaseTensor},
    {test: sre.CaseMultiscripts.test,
      constr: sre.CaseMultiscripts},
    {test: sre.CaseLine.test,
      constr: sre.CaseLine},
    {test: sre.CaseBinomial.test,
      constr: sre.CaseBinomial},
    {test: sre.CaseProof.test,
      constr: sre.CaseProof},
    {test: sre.CaseTable.test,
      constr: sre.CaseTable},
    {test: sre.CaseText.test,
      constr: sre.CaseText}
);

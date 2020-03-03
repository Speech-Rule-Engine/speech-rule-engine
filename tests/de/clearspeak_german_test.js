// Copyright 2020 Volker Sorge
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

//
// This work was sponsored by ETH Zurich
//


goog.provide('sre.ClearspeakGermanTest');

goog.require('sre.ClearspeakGermanAbsoluteValue');
goog.require('sre.ClearspeakGermanCapitalLetters');
goog.require('sre.ClearspeakGermanExponents');
goog.require('sre.ClearspeakGermanFractions');
goog.require('sre.ClearspeakGermanFunctions');
goog.require('sre.ClearspeakGermanImpliedTimes');
goog.require('sre.ClearspeakGermanIssues');
goog.require('sre.ClearspeakGermanLogarithms');
goog.require('sre.ClearspeakGermanMatricesAndCombinatorics');
goog.require('sre.ClearspeakGermanMultiLineEntries');
goog.require('sre.ClearspeakGermanNamedSets');
goog.require('sre.ClearspeakGermanParentheses');
goog.require('sre.ClearspeakGermanPart2Symbols');
goog.require('sre.ClearspeakGermanPart3Adornments');
goog.require('sre.ClearspeakGermanRoots');
goog.require('sre.ClearspeakGermanSetsEnclosedInSetBrackets');
goog.require('sre.ClearspeakGermanTrigometry');



/**
* @constructor
*/
sre.ClearspeakGermanTest = function() { };


/**
 * List of clearspeak tests to run.
 * @type {Array}
 */
sre.ClearspeakGermanTest.testList = [
  sre.ClearspeakGermanAbsoluteValue, // Fine
  sre.ClearspeakGermanCapitalLetters,
  sre.ClearspeakGermanExponents,  // Fine
  sre.ClearspeakGermanFractions,
  sre.ClearspeakGermanFunctions,  // Fine
  sre.ClearspeakGermanImpliedTimes,
  sre.ClearspeakGermanIssues,
  sre.ClearspeakGermanLogarithms,
  sre.ClearspeakGermanMatricesAndCombinatorics,  // Fine
  sre.ClearspeakGermanMultiLineEntries,
  sre.ClearspeakGermanNamedSets,
  sre.ClearspeakGermanParentheses, // Fine
  sre.ClearspeakGermanPart2Symbols,
  sre.ClearspeakGermanPart3Adornments,
  sre.ClearspeakGermanRoots,
  sre.ClearspeakGermanSetsEnclosedInSetBrackets,
  sre.ClearspeakGermanTrigometry  // Fine
];

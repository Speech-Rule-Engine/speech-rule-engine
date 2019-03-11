// Copyright 2017 Volker Sorge
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
// With support from the Mozilla Foundation under a MOSS grant.
//


goog.provide('sre.ClearspeakFrenchTest');

goog.require('sre.ClearspeakFrenchAbsoluteValue');
goog.require('sre.ClearspeakFrenchCapitalLetters');
goog.require('sre.ClearspeakFrenchExponents');
goog.require('sre.ClearspeakFrenchFractions');
goog.require('sre.ClearspeakFrenchFunctions');
goog.require('sre.ClearspeakFrenchImpliedTimes');
goog.require('sre.ClearspeakFrenchIssues');
goog.require('sre.ClearspeakFrenchLogarithms');
goog.require('sre.ClearspeakFrenchMatricesAndCombinatorics');
goog.require('sre.ClearspeakFrenchMultiLineEntries');
goog.require('sre.ClearspeakFrenchNamedSets');
goog.require('sre.ClearspeakFrenchParentheses');
goog.require('sre.ClearspeakFrenchPart2Symbols');
goog.require('sre.ClearspeakFrenchPart3Adornments');
goog.require('sre.ClearspeakFrenchRoots');
goog.require('sre.ClearspeakFrenchSetsEnclosedInSetBrackets');
goog.require('sre.ClearspeakFrenchTrigometry');



/**
* @constructor
*/
sre.ClearspeakFrenchTest = function() { };


/**
 * List of clearspeak tests to run.
 * @type {Array}
 */
sre.ClearspeakFrenchTest.testList = [
  sre.ClearspeakFrenchAbsoluteValue, // Fine
  sre.ClearspeakFrenchCapitalLetters,
  sre.ClearspeakFrenchExponents,  // Fine
  sre.ClearspeakFrenchFractions,
  sre.ClearspeakFrenchFunctions,  // Fine
  sre.ClearspeakFrenchImpliedTimes,
  sre.ClearspeakFrenchIssues,
  sre.ClearspeakFrenchLogarithms,
  sre.ClearspeakFrenchMatricesAndCombinatorics,  // Fine
  sre.ClearspeakFrenchMultiLineEntries,
  sre.ClearspeakFrenchNamedSets,
  sre.ClearspeakFrenchParentheses, // Fine
  sre.ClearspeakFrenchPart2Symbols,
  sre.ClearspeakFrenchPart3Adornments,
  sre.ClearspeakFrenchRoots,
  sre.ClearspeakFrenchSetsEnclosedInSetBrackets,
  sre.ClearspeakFrenchTrigometry  // Fine
];

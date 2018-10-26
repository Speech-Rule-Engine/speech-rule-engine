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


goog.provide('sre.ClearspeakTest');

goog.require('sre.ClearspeakAbsoluteValue');
goog.require('sre.ClearspeakCapitalLetters');
goog.require('sre.ClearspeakExponents');
goog.require('sre.ClearspeakFractions');
goog.require('sre.ClearspeakFunctions');
goog.require('sre.ClearspeakImpliedTimes');
goog.require('sre.ClearspeakIssues');
goog.require('sre.ClearspeakLogarithms');
goog.require('sre.ClearspeakMatricesAndCombinatorics');
goog.require('sre.ClearspeakMultiLineEntries');
goog.require('sre.ClearspeakNamedSets');
goog.require('sre.ClearspeakParentheses');
goog.require('sre.ClearspeakPart2Symbols');
goog.require('sre.ClearspeakPart3Adornments');
goog.require('sre.ClearspeakRoots');
goog.require('sre.ClearspeakSetsEnclosedInSetBrackets');
goog.require('sre.ClearspeakTrigometry');



/**
* @constructor
*/
sre.ClearspeakTest = function() { };


/**
 * List of clearspeak tests to run.
 * @type {Array}
 */
sre.ClearspeakTest.testList = [
  sre.ClearspeakAbsoluteValue,
  sre.ClearspeakCapitalLetters,
  sre.ClearspeakExponents,
  sre.ClearspeakFractions,
  sre.ClearspeakFunctions,
  sre.ClearspeakImpliedTimes,
  sre.ClearspeakIssues,
  sre.ClearspeakLogarithms,
  sre.ClearspeakMatricesAndCombinatorics,
  sre.ClearspeakMultiLineEntries,
  sre.ClearspeakNamedSets,
  sre.ClearspeakParentheses,
  sre.ClearspeakPart2Symbols,
  sre.ClearspeakPart3Adornments,
  sre.ClearspeakRoots,
  sre.ClearspeakSetsEnclosedInSetBrackets,
  sre.ClearspeakTrigometry
];

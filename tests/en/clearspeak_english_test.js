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


goog.provide('sre.ClearspeakEnglishTest');

goog.require('sre.ClearspeakEnglishIssues');



/**
* @constructor
*/
sre.ClearspeakEnglishTest = function() { };


/**
 * List of clearspeak tests to run.
 * @type {Array}
 */
sre.ClearspeakEnglishTest.testList = [
  sre.ClearspeakEnglishIssues,
];

// Copyright (c) 2020 Volker Sorge
// Copyright (c) 2020 The MathJax Consortium
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
 * @fileoverview Factory for testcases form the classes in this directory.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */


goog.provide('sretest.TestFactory');

goog.require('sretest.ApiTest');
goog.require('sretest.ClearspeakTest');
goog.require('sretest.ClearspeakAnnotationTest');
goog.require('sretest.CollapseTest');
goog.require('sretest.EnrichMathmlTest');
goog.require('sretest.EnrichSpeechTest');
goog.require('sretest.PrefixTest');
goog.require('sretest.RebuildStreeTest');
goog.require('sretest.SemanticTreeTest');
goog.require('sretest.SpeechTest');
goog.require('sretest.SummaryTest');
goog.require('sretest.SymbolTest');
goog.require('sretest.TestUtil');


/**
 * @type {Object.<function(new:sretest.AbstractJsonTest)>}
 */
sretest.TestFactory.map = {
  'api': sretest.ApiTest,
  'clearspeak': sretest.ClearspeakTest,
  'clearspeakAnnotation': sretest.ClearspeakAnnotationTest,
  'collapse': sretest.CollapseTest,
  'enrichMathml': sretest.EnrichMathmlTest,
  'enrichSpeech': sretest.EnrichSpeechTest,
  'prefix': sretest.PrefixTest,
  'rebuild': sretest.RebuildStreeTest,
  'semantic': sretest.SemanticTest,
  'speech': sretest.SpeechTest,
  'stree': sretest.SemanticTreeTest,
  'summary': sretest.SummaryTest,
  'symbol': sretest.SymbolTest
};


/**
 * Retrieves and instantiates a test object for a given input json file.
 * @param {string} file The input json file.
 * @return {!sretest.AbstractJsonTest} The JSON test.
 */
sretest.TestFactory.get = function(file) {
  var filename = sretest.TestUtil.fileExists(file, sretest.TestUtil.path.EXPECTED);
  var json = sretest.TestUtil.loadJson(filename);
  let factory = json['factory'];
  let constructor = sretest.TestFactory.map[factory];
  if (!constructor) {
    throw new sretest.TestUtil.Error('Bad factory name', file);
  }
  let obj = new constructor();
  obj.jsonFile = file;
  obj.jsonTests = json;
  return obj;
};

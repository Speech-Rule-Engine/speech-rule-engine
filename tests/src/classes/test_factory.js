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


goog.provide('sre.TestFactory');

goog.require('sre.ClearspeakTest');
goog.require('sre.CollapseTest');
goog.require('sre.EnrichMathmlTest');
goog.require('sre.EnrichSpeechTest');
goog.require('sre.PrefixTest');
goog.require('sre.RebuildStreeTest');
goog.require('sre.SemanticTreeTest');
goog.require('sre.SpeechTest');
goog.require('sre.SummaryTest');
goog.require('sre.SymbolTest');
goog.require('sre.TestUtil');


/**
 * @type {Object.<function(new:sre.AbstractJsonTest)>}
 */
sre.TestFactory.map = {
  'clearspeak': sre.ClearspeakTest,
  'collapse': sre.CollapseTest,
  'enrichMathml': sre.EnrichMathmlTest,
  'enrichSpeech': sre.EnrichSpeechTest,
  'prefix': sre.PrefixTest,
  'rebuild': sre.RebuildStreeTest,
  'semantic': sre.SemanticTest,
  'speech': sre.SpeechTest,
  'stree': sre.SemanticTreeTest,
  'summary': sre.SummaryTest,
  'symbol': sre.SymbolTest
};


/**
 * Retrieves and instantiates a test object for a given input json file.
 * @param {string} file The input json file.
 * @return {!sre.AbstractJsonTest} The JSON test.
 */
sre.TestFactory.get = function(file) {
  var filename = sre.TestUtil.fileExists(file, sre.TestUtil.path.EXPECTED);
  var json = sre.TestUtil.loadJson(filename);
  let factory = json.factory;
  let constructor = sre.TestFactory.map[factory];
  if (!constructor) {
    throw new sre.TestUtil.Error('Bad factory name', file);
  }
  let obj = new constructor();
  obj.jsonFile = file;
  obj.jsonTests = json;
  return obj;
};

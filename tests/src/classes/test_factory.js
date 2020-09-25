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

goog.require('sre.SymbolTest');
goog.require('sre.SpeechTest');
goog.require('sre.ClearspeakRuleTest');
goog.require('sre.CollapseRuleTest');
goog.require('sre.EnrichMathmlTest');
goog.require('sre.EnrichSpeechTest');
goog.require('sre.PrefixRuleTest');
goog.require('sre.RebuildStreeTest');
goog.require('sre.SemanticTreeTest');
goog.require('sre.SummaryRuleTest');
goog.require('sre.TestUtil');


sre.TestFactory.map = {
  'symbol': sre.SymbolTest,
  'clearspeak': sre.ClearspeakRuleTest,
  'collapse': sre.CollapseRuleTest,
  'speech': sre.SpeechTest,
  'prefix': sre.PrefixRuleTest,
  'rebuild': sre.RebuildStreeTest,
  'enrichSpeech': sre.EnrichSpeechTest,
  'stree': sre.SemanticTreeTest,
  'enrichMathml': sre.EnrichMathmlTest,
  'semantic': sre.SemanticTest,
  'summary': sre.SummaryRuleTest
};


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

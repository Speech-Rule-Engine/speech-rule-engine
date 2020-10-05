/**
 * @fileoverview Factory for testcases form the classes in this directory.
 *
 * @author v.sorge@mathjax.org (Volker Sorge)
 */
//
// Copyright (c) 2020 Volker Sorge
//
//
// Copyright (c) 2020 The MathJax Consortium
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//      http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {AbstractJsonTest, JsonFile} from './abstract_test';

import {TestPath, TestUtil, TestError} from '../base/test_util';
import {ApiTest} from './api_test';
import {ClearspeakAnnotationTest} from './clearspeak_annotation_test';
import {ClearspeakTest} from './clearspeak_test';
import {CollapseTest} from './collapse_test';
import {PrefixTest} from './prefix_test';
import {EnrichMathmlTest} from './semantic_test';
import {EnrichSpeechTest} from './semantic_test';
import {RebuildStreeTest} from './semantic_test';
import {SemanticTreeTest} from './semantic_test';
import {SpeechTest} from './speech_test';
import {SummaryTest} from './summary_test';
import {SymbolTest} from './symbol_test';

const map = new Map<string, any>([
  ['api', ApiTest],
  ['clearspeak', ClearspeakTest],
  ['clearspeakAnnotation', ClearspeakAnnotationTest],
  ['collapse', CollapseTest],
  ['enrichMathml', EnrichMathmlTest],
  ['enrichSpeech', EnrichSpeechTest],
  ['prefix', PrefixTest],
  ['rebuild', RebuildStreeTest],
  ['speech', SpeechTest],
  ['stree', SemanticTreeTest],
  ['summary', SummaryTest],
  ['symbol', SymbolTest]
]);

/**
 * Retrieves and instantiates a test object for a given input json file.
 * @param file The input json file.
 * @return The JSON test.
 */
export function get(file: string): AbstractJsonTest {
  let filename = TestUtil.fileExists(file, TestPath.EXPECTED);
  let json = TestUtil.loadJson(filename) as JsonFile;
  let factory = json['factory'] as string;
  let constructor = map.get(factory);
  if (!constructor) {
    throw new TestError('Bad factory name', file);
  }
  let obj = new constructor();
  obj.jsonFile = file;
  obj.jsonTests = json;
  return obj;
}

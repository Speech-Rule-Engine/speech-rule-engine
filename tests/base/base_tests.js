// Copyright (c) 2019 Volker Sorge
// Copyright (c) 2019 The MathJax Consortium
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


goog.provide('sre.BaseTests');

goog.require('sre.ApiTest');
goog.require('sre.ClearspeakAnnotationTest');
goog.require('sre.ColorPickerTest');
goog.require('sre.DirectSpeechTest');
goog.require('sre.DomTest');
goog.require('sre.MarkupTest');
goog.require('sre.MathAlphabetsTest');
goog.require('sre.SemanticApiTest');
goog.require('sre.SemanticRuleTest');
goog.require('sre.SpeechRuleTest');
goog.require('sre.WalkerTest');


/**
 * List that collates all the basic funcional and unit tests.
 * @type {Array}
 */
sre.BaseTests.testList = [
  sre.ApiTest,
  sre.ClearspeakAnnotationTest,
  sre.ColorPickerTest,
  sre.DirectSpeechTest,
  sre.DomTest,
  sre.MarkupTest,
  sre.MathAlphabetsTest,
  sre.SemanticApiTest,
  sre.SemanticRuleTest,
  sre.SpeechRuleTest,
  sre.WalkerTest
];

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


goog.provide('sretest.BaseTests');

goog.require('sretest.ColorPickerTest');
goog.require('sretest.DomTest');
goog.require('sretest.MarkupTest');
goog.require('sretest.SemanticApiTest');
goog.require('sretest.SpeechRuleTest');
goog.require('sretest.WalkerTest');


/**
 * List that collates all the basic funcional and unit tests.
 * @type {Array}
 */
sretest.BaseTests.testList = [
  sretest.ColorPickerTest,
  sretest.DomTest,
  sretest.MarkupTest,
  sretest.SemanticApiTest,
  sretest.SpeechRuleTest,
  sretest.WalkerTest
];

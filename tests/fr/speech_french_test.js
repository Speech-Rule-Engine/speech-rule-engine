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


goog.provide('sre.SpeechFrenchTest');

goog.require('sre.ClearspeakFrenchTest');
goog.require('sre.CollapseFrenchTest');
goog.require('sre.ClearspeakCharFrenchTest');
goog.require('sre.DefaultCharFrenchTest');
goog.require('sre.MathspeakCharFrenchTest');
goog.require('sre.MathspeakEmbellishFrenchTest');
goog.require('sre.MathspeakFrenchTest');
goog.require('sre.MmlcloudFrenchTest');
goog.require('sre.NobleFrenchTest');
goog.require('sre.PrefixFrenchTest');
goog.require('sre.SummaryFrenchTest');


/**
 * List of French speech generation tests to run.
 * @type {Array}
 */
sre.SpeechFrenchTest.testList = [
  sre.CollapseFrenchTest,
  sre.ClearspeakCharFrenchTest,
  sre.DefaultCharFrenchTest,
  sre.MathspeakCharFrenchTest,
  sre.MathspeakEmbellishFrenchTest,
  sre.MathspeakFrenchTest,
  sre.MmlcloudFrenchTest,
  sre.NobleFrenchTest,
  sre.PrefixFrenchTest,
  sre.SummaryFrenchTest
];
sre.SpeechFrenchTest.testList =
    sre.SpeechFrenchTest.testList.concat(sre.ClearspeakFrenchTest.testList);

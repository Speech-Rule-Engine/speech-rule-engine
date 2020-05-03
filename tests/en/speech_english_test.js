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


goog.provide('sre.SpeechEnglishTest');

goog.require('sre.ClearspeakCharEnglishTest');
goog.require('sre.ClearspeakEnglishTest');
goog.require('sre.CollapseEnglishTest');
goog.require('sre.DefaultCharEnglishTest');
goog.require('sre.MathspeakCharEnglishTest');
goog.require('sre.MathspeakEmbellishEnglishTest');
goog.require('sre.MathspeakEnglishFontTest');
goog.require('sre.MathspeakEnglishTest');
goog.require('sre.MmlcloudEnglishTest');
goog.require('sre.NobleEnglishTest');
goog.require('sre.PrefixEnglishTest');
goog.require('sre.SummaryEnglishTest');


/**
 * List of English speech generation tests to run.
 * @type {Array}
 */
sre.SpeechEnglishTest.testList = [
  sre.CollapseEnglishTest,
  sre.ClearspeakCharEnglishTest,
  sre.DefaultCharEnglishTest,
  sre.MathspeakCharEnglishTest,
  sre.MathspeakEmbellishEnglishTest,
  sre.MathspeakEnglishFontTest,
  sre.MathspeakEnglishTest,
  sre.MmlcloudEnglishTest,
  sre.NobleEnglishTest,
  sre.PrefixEnglishTest,
  sre.SummaryEnglishTest
];
sre.SpeechEnglishTest.testList =
    sre.SpeechEnglishTest.testList.concat(sre.ClearspeakEnglishTest.testList);

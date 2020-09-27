// Copyright 2019 Volker Sorge
// Copyright (c) 2019 The MathJax Consortium
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
 * @fileoverview Abstract class for clearspeak rule tests.
 * @author Volker.Sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.ClearspeakTest');

goog.require('sre.SpeechTest');



/**
 * @constructor
 * @extends {sre.SpeechTest}
 */
sre.ClearspeakTest = function() {
  sre.ClearspeakTest.base(this, 'constructor');

  /**
   * @override
   */
  this.domain = 'clearspeak';

};
goog.inherits(sre.ClearspeakTest, sre.SpeechTest);


/**
 * @override
 */
sre.ClearspeakTest.prototype.setUpTest = function() {
  sre.ClearspeakTest.base(this, 'setUpTest');
  sre.System.getInstance().setupEngine(
      {markup: sre.Engine.Markup.PUNCTUATION});
};


/**
 * @override
 */
sre.ClearspeakTest.prototype.tearDownTest = function() {
  sre.System.getInstance().setupEngine(
      {markup: sre.Engine.Markup.NONE});
  sre.ClearspeakTest.base(this, 'tearDownTest');
};
// Copyright 2018 Volker Sorge
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
// Tests from the issues discovered in ClearspeakFrench rules.
//


goog.provide('sre.ClearspeakFrenchIssues');

goog.require('sre.ClearspeakFrenchRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakFrenchRuleTest}
*/
sre.ClearspeakFrenchIssues = function() {
  sre.ClearspeakFrenchIssues.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'ClearspeakFrench Issues tests.';

};
goog.inherits(sre.ClearspeakFrenchIssues, sre.ClearspeakFrenchRuleTest);



//
// Issues
//


sre.ClearspeakFrenchIssues.prototype.testIssue230 = function() {
  var preference = 'default';
  this.executeRuleTest(
      '<mn>5</mn><mfrac><mn>3</mn><mn>224</mn></mfrac>',
      '', preference);
  this.executeRuleTest(
      '<mn>5</mn><mfrac><mn>3</mn><mn>4</mn></mfrac>',
      '', preference);
};


sre.ClearspeakFrenchIssues.prototype.testIssueNumbers = function() {
  var preference = 'default';
  this.executeRuleTest(
      '<mrow><mn>t2e4</mn></mrow>', '', preference);
  this.executeRuleTest(
      '<mrow><mn>#FF0000</mn></mrow>', '', preference);
  this.executeRuleTest(
      '<mrow><mn>#FFFF</mn></mrow>', '', preference);
};

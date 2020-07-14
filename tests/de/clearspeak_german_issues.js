// Copyright 2020 Volker Sorge
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
//  This work was sponsored by ETH Zurich
//


goog.provide('sre.ClearspeakGermanIssues');

goog.require('sre.ClearspeakGermanRuleTest');



/**
* @constructor
* @extends {sre.ClearspeakGermanRuleTest}
*/
sre.ClearspeakGermanIssues = function() {
  sre.ClearspeakGermanIssues.base(this, 'constructor');

  /**
   * @override
   */
  this.information = 'ClearspeakGerman Issues tests.';

};
goog.inherits(sre.ClearspeakGermanIssues, sre.ClearspeakGermanRuleTest);


//
// Issues
//
/**
 * Issue #230
 */
sre.ClearspeakGermanIssues.prototype.testIssue230 = function() {
  var preference = 'default';
  this.executeRuleTest(
      '<mn>5</mn><mfrac><mn>3</mn><mn>224</mn></mfrac>',
      '5, 3 geteilt durch 224', preference);
  this.executeRuleTest(
      '<mn>5</mn><mfrac><mn>3</mn><mn>4</mn></mfrac>',
      '5 drei viertel', preference);
};


/**
 * Issues with number expressions.
 */
sre.ClearspeakGermanIssues.prototype.testIssueNumbers = function() {
  var preference = 'default';
  this.executeRuleTest(
      '<mrow><mn>t2e4</mn></mrow>', 'Zahl t 2 e 4', preference);
  this.executeRuleTest(
      '<mrow><mn>#FF0000</mn></mrow>', 'Zahl Nummernzeichen F F 0 0 0 0', preference);
  this.executeRuleTest(
      '<mrow><mn>#FFFF</mn></mrow>', 'Zahl Nummernzeichen F F F F', preference);
};

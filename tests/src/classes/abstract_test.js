// Copyright 2014 Volker Sorge
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
 * @fileoverview Abstract class of test cases.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractTest');
goog.provide('sre.AbstractJsonTest');
goog.provide('sre.AbstractJsonMultiTest');

goog.require('sre.TestExternal');
goog.require('sre.TestUtil');



/**
 * @constructor
 */
sre.AbstractTest = function() {
  /**
   * Basic information on the test case.
   * @type {string}
   */
  this.information = '';

  /**
   * Assignment for the external assert module.
   * @type {Object}
   */
  this.assert = sre.TestExternal.assert;
};


/**
 * Sets up the basic requirements for the test.
 */
sre.AbstractTest.prototype.setUpTest = function() { };


/**
 * Finalises the test.
 */
sre.AbstractTest.prototype.tearDownTest = function() { };


/**
 * @constructor
 * @param {string} file The JSON file name.
 * @extends {sre.AbstractTest}
 */
sre.AbstractJsonTest = function(file) {
  sre.AbstractJsonTest.base(this, 'constructor');

  this.jsonFile = file;

  this.jsonTests = {};

  this.inputTests = [];

  this.pickFields = ['input', 'expected'];

};
goog.inherits(sre.AbstractJsonTest, sre.AbstractTest);


/**
 * Picks arguments from a JSON element.
 * @param {Object} json The JSON element.
 // TODO: Need to specify that further!
 * @return {Array.<string>} The array of arguments for the test method.
 */
sre.AbstractJsonTest.prototype.pick = function(json) {
  return this.pickFields.map(function(x) {return json[x];});
};


/**
 * The actual test method.
 * @param {...string} var_args Arguments for the test method.
 */
sre.AbstractJsonTest.prototype.method = goog.abstractMethod;

sre.AbstractJsonTest.prototype.prepare = function() {
  this.jsonTests = this.jsonFile ? sre.TestUtil.loadJson(this.jsonFile) : {};
  this.information = this.jsonTests.information || 'Unnamed tests';
};


sre.AbstractJsonTest.prototype.exists = function() {
  var file = sre.TestUtil.fileExists(
    this.jsonFile, sre.TestUtil.path.EXPECTED);
  if (!file) {
    return false;
  }
  this.jsonFile = file;
  return true;
};


/**
 * Class for tests to share input values. E.g., if rules need to be tested for
 * all locales they can share the same basic tests and only differ on the
 * expected output.
 *
 * @constructor
 * @param {string} tests The JSON file with expected values for the basic tests
 *     and additional tests.
 * @extends {sre.AbstractJsonTest}
 */
sre.AbstractJsonMultiTest = function(tests) {
  sre.AbstractJsonMultiTest.base(this, 'constructor', tests);

  this.baseFile = '';

  this.baseTests = {};

};
goog.inherits(sre.AbstractJsonMultiTest, sre.AbstractJsonTest);


sre.AbstractJsonMultiTest.prototype.prepare = function() {
  sre.AbstractJsonMultiTest.base(this, 'prepare');
  this.addBase_();
  this.baseTests = this.baseFile ? sre.TestUtil.loadJson(this.baseFile) : {};
};


sre.AbstractJsonMultiTest.prototype.addBase_ = function() {
  let file = this.jsonTests['base'];
  this.baseFile = sre.TestUtil.fileExists(file, sre.TestUtil.path.INPUT);
};

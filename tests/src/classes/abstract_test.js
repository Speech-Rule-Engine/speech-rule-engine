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

goog.provide('sretest.AbstractJsonTest');
goog.provide('sretest.AbstractTest');

goog.require('sretest.TestExternal');
goog.require('sretest.TestUtil');



/**
 * @constructor
 */
sretest.AbstractTest = function() {
  /**
   * Basic information on the test case.
   * @type {string}
   */
  this.information = '';

  /**
   * Assignment for the external assert module.
   * @type {Object}
   */
  this.assert = sretest.TestExternal.assert;
};


/**
 * Sets up the basic requirements for the test.
 */
sretest.AbstractTest.prototype.setUpTest = function() { };


/**
 * Finalises the test.
 */
sretest.AbstractTest.prototype.tearDownTest = function() { };



/**
 * Base class for tests that load their input and expected values from json
 * input files. If a base file is provided they load their input fom a different
 * json file than the expected results.
 *
 * E.g., if rules need to be tested for all locales they can share the same
 * basic test input and only differ on the expected output.
 *
 * @constructor
 * @extends {sretest.AbstractTest}
 */
sretest.AbstractJsonTest = function() {
  sretest.AbstractJsonTest.base(this, 'constructor');

  /**
   * @type {!string}
   */
  this.jsonFile = '';

  /**
   * @type {Object}
   */
  this.jsonTests = null;

  /**
   * @type {!string}
   */
  this.baseFile = '';

  /**
   * @type {Object}
   */
  this.baseTests = {};

  /**
   * @type {!Array.<Object>}
   */
  this.inputTests = [];

  /**
   * @type {!Array.<string>}
   */
  this.pickFields = ['input', 'expected'];

  /**
   * @type {!Array.<string>}
   */
  this.warn = [];

};
goog.inherits(sretest.AbstractJsonTest, sretest.AbstractTest);


/**
 * Picks arguments from a JSON element.
 * @param {Object} json The JSON element.
 // TODO: Need to specify that further!
 * @return {Array.<string>} The array of arguments for the test method.
 */
sretest.AbstractJsonTest.prototype.pick = function(json) {
  return this.pickFields.map(function(x) {return json[x];});
};


/**
 * The actual test method.
 * @param {...string} var_args Arguments for the test method.
 */
sretest.AbstractJsonTest.prototype.method = goog.abstractMethod;


/**
 * Prepares the individual tests of this object.
 */
sretest.AbstractJsonTest.prototype.prepare = function() {
  this.jsonTests = this.jsonTests ||
      (this.jsonFile ? sretest.TestUtil.loadJson(this.jsonFile) : {});
  this.information = this.jsonTests.information || 'Unnamed tests';
  let file = this.jsonTests['base'];
  this.baseFile = sretest.TestUtil.fileExists(file, sretest.TestUtil.path.INPUT);
  this.baseTests = this.baseFile ? sretest.TestUtil.loadJson(this.baseFile) : {};
  var input = this.baseTests.tests || {};
  var output = this.jsonTests.tests || {};
  var exclude = this.jsonTests.exclude || [];
  let tests = sretest.TestUtil.combineTests(input, output, exclude);
  this.inputTests = tests[0];
  this.warn = tests[1];
};

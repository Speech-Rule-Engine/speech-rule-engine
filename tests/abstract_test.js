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

goog.require('sre.TestExternal');



// TODO(sorge): Implement a cleanup/teardown method.
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


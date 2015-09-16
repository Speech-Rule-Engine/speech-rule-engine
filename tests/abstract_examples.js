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
 * @fileoverview Abstract class for test cases that produce example output.
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractExamples');

goog.require('sre.AbstractTest');
goog.require('sre.ExamplesOutput');
goog.require('sre.System');


/**
 * @constructor
 * @implements {sre.ExamplesOutput}
 * @extends {sre.AbstractTest}
 */
sre.AbstractExamples = function() {
  goog.base(this);
  
  /**
   * @type {boolean}
   * @private
   */
  this.active_ = false;
  
  /**
   * Possible file error.
   * @type {!string}
   * @private
   */
  this.fileError_ = '';

  /**
   * Name of the example output file and function.
   * @type {!string}
   * @private
   */
  this.examplesName_ = 'Examples';

  /**
   * Sets example output file for tests.
   * @type {!string}
   * @private
   */
  this.examplesFile_ = 'tests.js';

  /**
   * The output values.
   * @type {Array.<string>}
   * @private
   */
  this.examples_ = [];
};
goog.inherits(sre.AbstractExamples, sre.AbstractTest);


/**
 * @override
 */
sre.AbstractExamples.prototype.setActive = function(file) {
  //TODO: (sorge) Make lab examples into a dictionary and handle multiple files.
  // this.examplesFile_ = file;
  this.active_ = true;
};


/**
 * @override
 */
sre.AbstractExamples.prototype.startExamples = function() {
  if (!this.active_) return;
  try {
    sre.SystemExternal.fs.openSync(this.examplesFile_, 'w+');
  } catch (err) {
    this.fileError_ = 'Bad file name ' + this.examplesFile_;
  }
};


/**
 * @override
 */
sre.AbstractExamples.prototype.appendExamples = function(example) {
  // TODO (sorge) Rewrite this to append asynchronously to file.
  if (this.active_ && !this.fileError_) {
    this.examples_.push(example.replace(/(['"])/g, '\\\''));
  }
};


/**
 * @override
 */
sre.AbstractExamples.prototype.endExamples = function() {
  if (!this.active_) return;
  if (!this.fileError_) {
    try {
      sre.SystemExternal.fs.appendFileSync(
        this.examplesFile_,
        'Lab.' + this.examplesName_ +
          ' = [\'' + this.examples_.join('\',\n\'') + '\']');
    } catch (err) {
      this.fileError_ = 'Could not append to file ' + this.examplesFile_;
    }
  }
  this.examples_ = [];
  this.active_ = false;
  if (this.fileError_) {
    throw new sre.System.Error(this.fileError_);
  }
};


/**
 * @override
 */
sre.AbstractExamples.prototype.setUpTest = function() {
  this.startExamples();
};


/**
 * @override
 */
sre.AbstractExamples.prototype.tearDownTest = function() {
  this.endExamples();
};

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
goog.require('sre.Engine');
goog.require('sre.ExamplesOutput');



/**
 * @constructor
 * @implements {sre.ExamplesOutput}
 * @extends {sre.AbstractTest}
 */
sre.AbstractExamples = function() {
  sre.AbstractExamples.base(this, 'constructor');

  /**
   * @type {boolean}
   * @private
   */
  this.active_ = true;

  /**
   * Possible file error.
   * @type {string}
   * @private
   */
  this.fileError_ = '';

  /**
   * Name of the example output file and function.
   * @type {string}
   * @private
   */
  this.fileName_ = 'Examples';

  /**
   * File extension. Default html.
   * @type {string}
   * @private
   */
  this.fileExtension_ = 'html';

  /**
   * Base directory for the output file.
   * @type {string}
   * @protected
   */
  this.fileDirectory = 'resources/www/localisation';

  /**
   * Sets example output file for tests.
   * @type {string}
   * @private
   */
  this.examplesFile_ = this.fileDirectory + '/tests.' + this.fileExtension_;

  /**
   * The output values.
   * @type {Object.<string, Array.<string>>}
   * @private
   */
  this.examples_ = [];
};
goog.inherits(sre.AbstractExamples, sre.AbstractTest);


/**
 * @override
 */
sre.AbstractExamples.prototype.setActive = function(file, opt_ext) {
  var ext = opt_ext || this.fileExtension_;
  this.examplesFile_ = this.fileDirectory + '/' + file + '.' + ext;
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
sre.AbstractExamples.prototype.appendExamples = function(type, example) {
  if (this.active_ && !this.fileError_) {
    var examples = this.examples_[type];
    var cleaned = this.cleanup(example);
    if (examples) {
      examples.push(cleaned);
    } else {
      this.examples_[type] = [cleaned];
    }
  }
};


/**
 * @override
 */
sre.AbstractExamples.prototype.endExamples = function() {
  if (!this.active_) return;
  if (!this.fileError_) {
    try {
      for (var key in this.examples_) {
        sre.SystemExternal.fs.appendFileSync(
            this.examplesFile_, key);
        sre.SystemExternal.fs.appendFileSync(
            this.examplesFile_, this.join(this.examples_[key]));
      }
    } catch (err) {
      this.fileError_ = 'Could not append to file ' + this.examplesFile_;
    }
  }
  this.examples_ = [];
  this.active_ = false;
  if (this.fileError_) {
    throw new sre.Engine.Error(this.fileError_);
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


/**
 * Cleans up an example string.
 * @param {string} example The example string.
 * @return {string} The cleaned version of the string.
 */
sre.AbstractExamples.prototype.cleanup = function(example) {
  return example.replace(/(['"])/g, '\\\'');
};


/**
 * Joins the accumulated list of examples into a single output string.
 * @param {Array.<string>} examples The list of examples.
 * @return {string} The joined string.
 */
sre.AbstractExamples.prototype.join = function(examples) {
  return 'Lab.' + this.fileName_ +
      ' = [\'' + examples.join('\',\n\'') + '\']';
};

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

goog.provide('sretest.AbstractExamples');
goog.provide('sretest.ExampleFiles');

goog.require('sretest.AbstractJsonTest');
goog.require('sretest.ExamplesOutput');
goog.require('sretest.TestUtil');



/**
 * @constructor
 * @implements {sretest.ExamplesOutput}
 * @extends {sretest.AbstractJsonTest}
 */
sretest.AbstractExamples = function() {
  sretest.AbstractExamples.base(this, 'constructor');

  /**
   * @type {boolean}
   * @private
   */
  this.active_ = false;

  /**
   * Possible file error.
   * @type {string}
   * @private
   */
  this.fileError_ = '';

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
  this.fileDirectory = sretest.TestUtil.path.OUTPUT;

  /**
   * Sets example output file for tests.
   * @type {string}
   * @private
   */
  this.examplesFile_ = '';

  /**
   * The output values.
   * @type {Object.<string, Array.<string>>}
   * @private
   */
  this.examples_ = [];

};
goog.inherits(sretest.AbstractExamples, sretest.AbstractJsonTest);


/**
 * @override
 */
sretest.AbstractExamples.prototype.setActive = function(file, opt_ext) {
  this.active_ = true;
  this.fileName_ = file;
  var ext = opt_ext || this.fileExtension_;
  this.examplesFile_ = this.fileDirectory + file + '.' + ext;
};


/**
 * @override
 */
sretest.AbstractExamples.prototype.startExamples = function() {
  if (!this.active_) return;
  try {
    sretest.ExampleFiles.openFile(this.examplesFile_, this);
  } catch (err) {
    this.fileError_ = this.examplesFile_;
  }
};


/**
 * @override
 */
sretest.AbstractExamples.prototype.appendExamples = function(type, example) {
  if (this.active_ && !this.fileError_) {
    var examples = this.examples_[type];
    if (examples) {
      examples.push(example);
    } else {
      this.examples_[type] = [example];
    }
  }
};


/**
 * @override
 */
sretest.AbstractExamples.prototype.endExamples = function() {
  if (!this.active_) return;
  if (!this.fileError_) {
    try {
      for (var key in this.examples_) {
        sretest.TestExternal.fs.appendFileSync(
            this.examplesFile_, key);
        sretest.TestExternal.fs.appendFileSync(
            this.examplesFile_, this.join(this.examples_[key]));
      }
    } catch (err) {
      this.fileError_ = 'Could not append to file ' + this.examplesFile_;
    }
  }
  this.examples_ = [];
  this.active_ = false;
  if (this.fileError_) {
    throw new sretest.TestUtil.Error('Bad Filename', this.fileError_);
  }
};


/**
 * @override
 */
sretest.AbstractExamples.prototype.setUpTest = function() {
  this.startExamples();
};


/**
 * @override
 */
sretest.AbstractExamples.prototype.tearDownTest = function() {
  this.endExamples();
};


/**
 * Joins the accumulated list of examples into a single output string.
 * @param {Array.<string>} examples The list of examples.
 * @return {string} The joined string.
 */
sretest.AbstractExamples.prototype.join = function(examples) {
  return JSON.stringify(examples, null, 2);
};


/**
 * @return {string} Output file header.
 */
sretest.AbstractExamples.prototype.header = function() {
  return '';
};


/**
 * @return {string} Output file footer.
 */
sretest.AbstractExamples.prototype.footer = function() {
  return '';
};


/**
 * @type {!Object.<sretest.AbstractExamples>}
 */
sretest.ExampleFiles.openFiles = {};


/**
 * @type {Object.<string>}
 * TODO: This is actually a file descriptor type.
 */
sretest.ExampleFiles.descriptors = {};


/**
 * Opens an output file and registers it.
 * @param {string} file The name of the output file.
 * @param {sretest.AbstractExamples} obj The test object.
 */
sretest.ExampleFiles.openFile = function(file, obj) {
  if (!sretest.ExampleFiles.openFiles[file]) {
    let fd = sretest.TestExternal.fs.openSync(file, 'w+');
    sretest.ExampleFiles.descriptors[file] = fd;
    sretest.TestExternal.fs.appendFileSync(fd, obj.header());
  }
  sretest.ExampleFiles.openFiles[file] = obj;
};


/**
 * Finalises and closes all open output files.
 */
sretest.ExampleFiles.closeFiles = function() {
  for (let file of Object.keys(sretest.ExampleFiles.openFiles)) {
    sretest.TestExternal.fs.appendFileSync(
        file, sretest.ExampleFiles.openFiles[file].footer());
    sretest.TestExternal.fs.closeSync(sretest.ExampleFiles.descriptors[file]);
  }
};

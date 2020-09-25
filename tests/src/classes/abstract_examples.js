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
goog.provide('sre.ExampleFiles');

goog.require('sre.AbstractJsonMultiTest');
goog.require('sre.TestUtil');
goog.require('sre.ExamplesOutput');



/**
 * @constructor
 * @implements {sre.ExamplesOutput}
 * @extends {sre.AbstractJsonMultiTest}
 * @param {string=} opt_tests The JSON file if necessary for testing.
 */
sre.AbstractExamples = function(opt_tests) {
  sre.AbstractExamples.base(
    this, 'constructor', opt_tests ? opt_tests : '');

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
  this.fileDirectory = 'res/l10n';

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
goog.inherits(sre.AbstractExamples, sre.AbstractJsonMultiTest);


/**
 * @override
 */
sre.AbstractExamples.prototype.setActive = function(file, opt_ext) {
  this.active_ = true;
  this.fileName_ = file;
  var ext = opt_ext || this.fileExtension_;
  this.examplesFile_ = this.fileDirectory + '/' + file + '.' + ext;
};


/**
 * @override
 */
sre.AbstractExamples.prototype.startExamples = function() {
  if (!this.active_) return;
  try {
    sre.ExampleFiles.openFile(this.examplesFile_, this);
  } catch (err) {
    this.fileError_ = this.examplesFile_;
  }
};


/**
 * @override
 */
sre.AbstractExamples.prototype.appendExamples = function(type, example) {
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
    throw new sre.TestUtil.Error('Bad Filename', this.fileError_);
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
 * Joins the accumulated list of examples into a single output string.
 * @param {Array.<string>} examples The list of examples.
 * @return {string} The joined string.
 */
sre.AbstractExamples.prototype.join = function(examples) {
  return JSON.stringify(examples, null, 2);
};


/**
 * @return {string} Output file header.
 */
sre.AbstractExamples.prototype.header = function() {
  return '';
};


/**
 * @return {string} Output file footer.
 */
sre.AbstractExamples.prototype.footer = function() {
  return '';
};


sre.ExampleFiles = {};

sre.ExampleFiles.openFiles = {};

sre.ExampleFiles.descriptors = {};


sre.ExampleFiles.openFile = function(file, obj) {
  if (!sre.ExampleFiles.openFiles[file]) {
    let fd = sre.SystemExternal.fs.openSync(file, 'w+');
    sre.ExampleFiles.descriptors[file] = fd;
    sre.SystemExternal.fs.appendFileSync(fd, obj.header());
  }
  sre.ExampleFiles.openFiles[file] = obj;
};


sre.ExampleFiles.closeFiles = function() {
  for (let file of Object.keys(sre.ExampleFiles.openFiles)) {
    sre.SystemExternal.fs.appendFileSync(
      file, sre.ExampleFiles.openFiles[file].footer());
    sre.SystemExternal.fs.closeSync(sre.ExampleFiles.descriptors[file]);
  }
};

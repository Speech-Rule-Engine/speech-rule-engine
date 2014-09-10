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
 * @fileoverview Debug facility for the speech rule engine.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */


goog.provide('sre.Debugger');

goog.require('sre.SystemExternal');



/**
 * @constructor
 */
sre.Debugger = function() {
  /**
   * Whether the debugger is active.
   * @type {boolean}
   * @private
   */
  this.isActive_ = false;
  /**
   * @type {function(string)} Output function.
   * @private
   */
  this.outputFunction_ = console.log;
  /**
   * @type {?Object} Output stream of the debug file.
   * @private
   */
  this.stream_ = null;
};
goog.addSingletonGetter(sre.Debugger);


/**
 * Flag for the debug mode of the speech rule engine.
 * @param {string=} opt_file A filename to log the debug information.
 */
sre.Debugger.prototype.init = function(opt_file) {
  if (opt_file) {
    this.startDebugFile_(opt_file);
  }
  this.isActive_ = true;
};


/**
 * Initialises the debug file.
 * This is handled asynchronously.
 * @param {!string} filename The filename to route debug output to.
 * @private
 */
sre.Debugger.prototype.startDebugFile_ = function(filename) {
  this.stream_ = sre.SystemExternal.fs.createWriteStream(filename);
  this.outputFunction_ = goog.bind(
      function(var_args) {
        var outputList = Array.prototype.slice.call(arguments, 0);
        this.stream_.write(outputList.join(' '));
        this.stream_.write('\n');},
      this);
  this.stream_.on('error', goog.bind(
      function(error) {
        console.log('Invalid log file. Debug information sent to console.');
        this.outputFunction_ = console.log;
      },
      this));
  this.stream_.on('finish', function(error) {
    console.log('Finalizing debug file.');
  });
};


/**
 * Writes the debug output to the debuggers current stream.
 * @param {Array.<string>} outputList List of output strings.
 * @private
 */
sre.Debugger.prototype.output_ = function(outputList) {
  this.outputFunction_.apply(
      this.outputFunction_,
      ['Speech Rule Engine Debugger:'].concat(outputList));
};


/**
 * Give debug output.
 * @param {...*} var_args Rest elements of debug output.
 */
sre.Debugger.prototype.output = function(var_args) {
  if (this.isActive_) {
    this.output_(Array.prototype.slice.call(arguments, 0));
  }
};


/**
 * Give debug output by compiling executing a function. The main idea is that
 * costly output is only generated when the debug mode is indeed active.
 * @param {function(): Array.<string>} func The function that generates the
 *      debug output.
 */
sre.Debugger.prototype.generateOutput = function(func) {
  if (this.isActive_) {
    this.output_(func.apply(func, []));
  }
};


/**
 * Gracefully exits the debugger.
 */
sre.Debugger.prototype.exit = function() {
  if (this.isActive_ && this.stream_) {
    this.stream_.end();
  }
};

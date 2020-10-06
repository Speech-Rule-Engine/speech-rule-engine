// Copyright 2015 Volker Sorge
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
 * @fileoverview Interface for tests that produce examples as output.
 * @author v.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sretest.ExamplesOutput');



/**
 * @interface
 */
sretest.ExamplesOutput = function() { };


/**
 * Activates the example output.
 * @param {string} file The output file.
 * @param {string=} opt_ext A file extension.
 */
sretest.ExamplesOutput.prototype.setActive = function(file, opt_ext) { };


/**
 * Initialised the examples output but setting up the file.
 */
sretest.ExamplesOutput.prototype.startExamples = function() { };


/**
 * Appends a string to the examples file if it exists.
 * @param {string} type The type of example.
 * @param {string} example The example output.
 */
sretest.ExamplesOutput.prototype.appendExamples = function(type, example) { };


/**
 * Finished writing examples and closes the file.
 */
sretest.ExamplesOutput.prototype.endExamples = function() { };

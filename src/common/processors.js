// Copyright 2019 Volker Sorge
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
 * @fileoverview Processors acting on input/output streams.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */
goog.provide('sre.Processors');
goog.provide('sre.Processor');

goog.require('sre.Engine');


sre.Processors = {};

/**
 * Processors bundles a processing method with a collection of output methods.
 * @constructor
 * @template T, S
 * @param {string} name The name of the processor.
 * @param {function(string): T} processor The actual processing method.
 * @param {function(T): string} file The output to file.
 * @param {function(T): string} stdout The output to console.
 * @param {(function(T): S)= } opt_data The output to node process. This normally
 *     defaults to the processor, but it can have additional transformations.
 */
sre.Processor = function(name, processor, file, stdout, opt_data) {


  /**
   * @type {string}
   */
  this.name = name;
  
  /**
   * Version number.
   * @type {function(string): T}
   */
  this.processor = processor;

  /**
   * @type {function(T): string}
   */
  this.file = file;

  /**
   * @type {function(T): string}
   */
  this.stdout = stdout;

  /**
   * @type {function(T): S}
   */
  this.data = opt_data || function(x) {return x;};

  sre.Processors[this.name] = this;
};


new sre.Processor(
  'speech',
  function(expr) {
    var mml = sre.DomUtil.parseInput(expr);
    var xml = sre.Semantic.xmlTree(mml);
    var descrs = sre.SpeechGeneratorUtil.computeSpeech(xml);
    var aural = sre.AuralRendering.getInstance();
    return aural.finalize(aural.markup(descrs));
  },
  function(x) {return x.toString();},
  function(x) {return x.toString();}
);
  
                  

// Class to set and get processors.
// Processor class: 



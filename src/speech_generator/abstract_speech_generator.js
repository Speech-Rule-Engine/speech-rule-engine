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
 * @fileoverview Abstract speech generator for classes that work on the rebuilt
 *     semantic tree.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.AbstractSpeechGenerator');

goog.require('sre.AuralRendering');
goog.require('sre.RebuildStree');
goog.require('sre.SpeechGenerator');
goog.require('sre.SpeechGeneratorUtil');



/**
 * @constructor
 * @implements {sre.SpeechGenerator}
 */
sre.AbstractSpeechGenerator = function() {


  /**
   * @type {sre.RebuildStree}
   * @private
   */
  this.rebuilt_ = null;


  /**
   * @type {Object.<string>}
   * @private
   */
  this.options_ = {};


  /**
   * @type {sre.EnrichMathml.Attribute}
   */
  this.modality = sre.EnrichMathml.addPrefix('speech');

};


/**
 * @override
 */
sre.AbstractSpeechGenerator.prototype.getRebuilt = function() {
  return this.rebuilt_;
};


/**
 * @override
 */
sre.AbstractSpeechGenerator.prototype.setRebuilt = function(rebuilt) {
  this.rebuilt_ = rebuilt;
};


sre.AbstractSpeechGenerator.prototype.setOptions = function(options) {
  this.options_ = options || {};
  this.modality = sre.EnrichMathml.addPrefix(this.options_.modality || 'speech');
};


sre.AbstractSpeechGenerator.prototype.getOptions = function() {
  return this.options_;
};

/**
 * @override
 */
sre.AbstractSpeechGenerator.prototype.getSpeech = goog.abstractMethod;


/**
 * @override
 */
sre.AbstractSpeechGenerator.prototype.start = function() { };


/**
 * @override
 */
sre.AbstractSpeechGenerator.prototype.end = function() { };


/**
 * Generates speech string for a sub tree of the xml element.
 * @param {!Node} node The target element of the event.
 * @param {!Element} xml The base xml element belonging to node.
 * @return {string} The generated speech string.
 */
sre.AbstractSpeechGenerator.prototype.generateSpeech = function(node, xml) {
  if (!this.rebuilt_) {
    this.rebuilt_ = new sre.RebuildStree(xml);
  }
  sre.System.getInstance().setupEngine(this.options_);
  var descrs = sre.SpeechGeneratorUtil.computeSpeech(this.getRebuilt().xml);
  return sre.AuralRendering.getInstance().markup(descrs);
};

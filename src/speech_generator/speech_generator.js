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
 * @fileoverview Interface for Math Speech Generators.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SpeechGenerator');

goog.require('sre.DynamicCstr');
goog.require('sre.RebuildStree');



/**
 * @interface
 */
sre.SpeechGenerator = function() { };


/**
 * Returns the speech string for math node.
 * @param {!Node} node The target element of the event.
 * @param {!Element} xml The base xml element belonging to node.
 * @return {string} The speech string computed for this element.
 */
sre.SpeechGenerator.prototype.getSpeech = function(node, xml) {};


/**
 * Returns the semantic tree rebuilt from the base xml element.
 * @return {sre.RebuildStree} The reconstructed semantic tree.
 */
sre.SpeechGenerator.prototype.getRebuilt = function() {};


/**
 * Sets the rebuilt semantic tree object of the speech generator.
 * @param {!sre.RebuildStree} rebuilt The reconstructed semantic tree.
 */
sre.SpeechGenerator.prototype.setRebuilt = function(rebuilt) {};


/**
 * Sets dynamic constraint options for the speech engine.
 * @param {sre.DynamicCstr.Map} options The dynamic constraint.
 */
sre.SpeechGenerator.prototype.setOptions = function(options) {};


/**
 * @return {sre.DynamicCstr.Map} Dynamic constraint options of the generator.
 */
sre.SpeechGenerator.prototype.getOptions = function() {};


/**
 * Sets up or resets the speech generator.
 */
sre.SpeechGenerator.prototype.start = function() {};


/**
 * Cleans up after ending speech generation.
 */
sre.SpeechGenerator.prototype.end = function() {};

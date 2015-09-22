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
 * @fileoverview Interface for Math SpeechGenerators.
 *
 * @author volker.sorge@gmail.com (Volker Sorge)
 */

goog.provide('sre.SpeechGeneratorInterface');



/**
 * @interface
 */
sre.SpeechGeneratorInterface = function() { };


/**
 * Returns the speech string for math node.
 * @param {!Node} node The target element of the event.
 * @return {!string} The speech string computed for this element.
 */
sre.SpeechGeneratorInterface.prototype.getSpeech = function(node) {};


/**
 * Sets up or resets the speech generator.
 */
sre.SpeechGeneratorInterface.prototype.start = function() {};


/**
 * Cleans up after ending speech generation.
 */
sre.SpeechGeneratorInterface.prototype.end = function() {};
